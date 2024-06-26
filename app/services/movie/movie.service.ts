import axios, { axiosClassic } from 'api/interceptors'
import { getMoviesUrl } from 'configs/api.config'

import { IMovieEditInput } from '@/components/screens/admin/movie/movie-edit.interface'
import { IMovie } from '@/shared/types/movie.interface'

export const MovieService = {
	async getMovieBySlug(slug: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`))
	},

	async getMovieByActor(actorId: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`))
	},

	async getMovieByGenres(genreIds: string[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-genres`), {
			genreIds,
		})
	},

	async getAllMovies(searchTerm?: string) {
		const data = await axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
		return data
	},

	async getMostPopularMovies() {
		const { data } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		)
		return data
	},

	async updateCountOpenedMovie(slug: string) {
		return axiosClassic.put(getMoviesUrl('/update-count-opened'), {
			slug,
		})
	},

	// Admin section
	async getMovieById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
	},

	async createMovie() {
		const data = await axios.post<string>(getMoviesUrl(''))
		return data
	},

	async updateMovie(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${_id}`), data)
	},

	async deleteMovie(_id: string) {
		const data = await axios.delete<string>(getMoviesUrl(`/${_id}`))
		return data
	},
}
