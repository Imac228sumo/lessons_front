import axios from 'axios'
import { API_SERVER_URL, API_URL } from 'configs/api.config'
import Cookies from 'js-cookie'

import { errorCatch, getContentType } from './api.helpers'
import { IS_PRODUCTION } from '@/configs/constants'
import { removeTokensStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

export const axiosClassic = axios.create({
	baseURL: IS_PRODUCTION ? API_SERVER_URL : API_URL,
	headers: getContentType(),
})

export const instance = axios.create({
	baseURL: API_URL,
	headers: getContentType(),
})

//добовляем в токен чтобы сервер понял что мы авторизованны
instance.interceptors.request.use(config => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

//обновляем токен если пришла ошибка что токен кончился
instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeTokensStorage()
			}
		}

		throw error
	}
)

export default instance
