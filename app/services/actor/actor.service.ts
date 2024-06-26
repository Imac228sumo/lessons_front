import axios, { axiosClassic } from 'api/interceptors'

import { IActorEditInput } from '@/components/screens/admin/actor/actor-edit.interface'
import { getActorsUrl } from '@/configs/api.config'
import { IActor } from '@/shared/types/movie.interface'

export const ActorService = {
	async getAllActors(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(``), {
			params: searchTerm
				? {
						searchTerm,
					}
				: {},
		})
	},

	async getActorBySlug(slug: string) {
		return axiosClassic.get<IActor>(getActorsUrl(`/by-slug/${slug}`))
	},

	// Admin section
	async getActorById(_id: string) {
		return axios.get<IActorEditInput>(getActorsUrl(`/${_id}`))
	},

	async createActor() {
		const data = await axios.post<string>(getActorsUrl(''))
		debugger
		return data
	},

	async updateActor(_id: string, data: IActorEditInput) {
		return axios.put<string>(getActorsUrl(`/${_id}`), data)
	},

	async deleteActor(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`))
	},
}
