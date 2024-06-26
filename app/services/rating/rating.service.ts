import axios from 'api/interceptors'

import { getRatingsUrl } from '@/configs/api.config'

export const RatingService = {
	async setRating(movieId: string, value: number) {
		return axios.put<string>(getRatingsUrl('/set-rating'), {
			movieId,
			value,
		})
	},

	async getRatingByUser(movieId: string) {
		return axios.get<number>(getRatingsUrl(`/${movieId}`))
	},
}
