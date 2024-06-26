import { IActor } from '@/shared/types/movie.interface'

export interface IActorEditInput extends Omit<IActor, '_id' | 'countMovies'> {}
