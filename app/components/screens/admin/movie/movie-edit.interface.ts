import { IMovie } from '@/shared/types/movie.interface'

export interface IMovieEditInput
	extends Omit<IMovie, '_id' | 'rating' | 'countOpened' | 'genres' | 'actors'> {
	genres: string[]
	actors: string[]
}
