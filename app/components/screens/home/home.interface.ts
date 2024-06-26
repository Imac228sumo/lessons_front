import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { ISlide } from '@/components/ui/slider/slider.interface'
import { IMovie } from '@/shared/types/movie.interface'

export interface ISlideMovie
	extends Pick<IMovie, '_id' | 'bigPoster' | 'title' | 'genres' | 'slug'> {}

export interface IHome {
	slides: ISlide[]
	trendingMovies: IGalleryItem[]
	actors: IGalleryItem[]
}
