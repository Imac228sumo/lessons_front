import { IActor, IMovie } from '@/shared/types/movie.interface'

export interface IActorPage {
	actor: IActor
	movies: IMovie[]
}
