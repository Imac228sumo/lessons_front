import axios from 'api/interceptors'
import { getUsersUrl } from 'configs/api.config'

import { IProfileInput } from '@/components/screens/profile/profile.interface'
import { IMovie } from '@/shared/types/movie.interface'
import { IUser } from '@/shared/types/user.interface'

export const UserService = {
	async getProfile() {
		return axios.get<IUser>(getUsersUrl('/profile'))
	},

	async updateProfile(data: IProfileInput) {
		//console.log(data)
		// if (data.password?.length) {
		// 	return axios.put<string>(getUsersUrl('/profile'), data)
		// } else {
		// 	const data_tmp = {
		// 		email: data.email,
		// 	}
		// 	return axios.put<string>(getUsersUrl('/profile'), data_tmp)
		// }

		return axios.put<string>(getUsersUrl('/profile'), data)
	},

	async getFavorites() {
		return axios.get<IMovie[]>(getUsersUrl('/profile/favorites'))
	},

	async toggleFavorite(movieId: string) {
		return axios.put(getUsersUrl('/profile/favorites'), {
			movieId,
		})
	},

	// Admin section
	async getUserById(_id: string) {
		return axios.get<IUser>(getUsersUrl(`/${_id}`))
	},

	async updateUser(_id: string, data: IProfileInput) {
		if (data.password?.length) {
			return axios.put<string>(getUsersUrl(`/${_id}`), data)
		} else {
			const data_tmp = {
				email: data.email,
				isAdmin: data.isAdmin,
			}
			return axios.put<string>(getUsersUrl(`/${_id}`), data_tmp)
		}
	},

	async getAllUsers(searchTerm?: string) {
		const data = await axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
		return data
	},

	async deleteUser(_id: string) {
		const data = await axios.delete<IUser>(getUsersUrl(`/${_id}`))
		return data
	},
}
