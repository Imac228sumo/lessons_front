import { IMovie } from '@/shared/types/movie.interface'

export interface ISlide extends Pick<IMovie, '_id' | 'bigPoster' | 'title'> {
	subTitle: string
	link: string
}

//Pick чтобы брать нужные поля
