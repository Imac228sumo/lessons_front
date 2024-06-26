import axios, { axiosClassic } from 'api/interceptors'
import { getGenresUrl } from 'configs/api.config'

import { IGenreEditInput } from '@/components/screens/admin/genre/genre-edit.interface'
import { ICollection } from '@/components/screens/collections/collections.interface'
import { IGenre } from '@/shared/types/movie.interface'

export const GenreService = {
	async getAllGenres(searchTerm?: string) {
		const data = await axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
		return data
	},

	async getGenreBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`))
	},

	async getCollections() {
		const data = await axiosClassic.get<ICollection[]>(
			getGenresUrl('/collections')
		)
		return data
	},

	// Admin section
	async getGenreById(_id: string) {
		return axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`))
	},

	async createGenre() {
		const data = await axios.post<string>(getGenresUrl(''))
		return data
	},

	async updateGenre(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`/${_id}`), data)
	},

	async deleteGenre(_id: string) {
		const data = await axios.delete<string>(getGenresUrl(`/${_id}`))
		return data
	},
}
