import { IMovie } from '@/shared/types/movie.interface'

export interface IMovieList {
	title: string
	link: string
	movies: IMovie[]
}
