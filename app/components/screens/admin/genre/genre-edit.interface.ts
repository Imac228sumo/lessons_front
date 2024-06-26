import { IGenre } from '@/shared/types/movie.interface'

export interface IGenreEditInput extends Omit<IGenre, '_id'> {}
//Omit уберает лишнее поле
