import { IGenre, IMovie } from '@/shared/types/movie.interface'

export interface IGenrePage {
	genre: IGenre
	movies: IMovie[]
}
