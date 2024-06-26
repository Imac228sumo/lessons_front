import { IMovie } from '@/shared/types/movie.interface'

export interface ICatalog {
	title: string
	description?: string
	movies: IMovie[]
}
