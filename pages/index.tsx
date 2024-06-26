import { GetStaticProps, NextPage } from 'next'

import { Home } from '@/components/screens/home/Home'
import { IHome } from '@/components/screens/home/home.interface'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { ISlide } from '@/components/ui/slider/slider.interface'
import { getActorsUrl, getMoviesUrl } from '@/configs/url.config'
import { ActorService } from '@/services/actor/actor.service'
import { MovieService } from '@/services/movie/movie.service'
import { getGenresList } from '@/utils/movie/getGenresList'

const HomePage: NextPage<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<Home slides={slides} actors={actors} trendingMovies={trendingMovies} />
	)
}

// getStaticProps подгружает данные с базы данных на этапе билдинга сайта
export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAllMovies()
		const { data: dataActors } = await ActorService.getAllActors()
		const dataTrendingMovies = await MovieService.getMostPopularMovies()

		const slides: ISlide[] = movies.slice(0, 3).map(m => ({
			_id: m._id,
			link: getMoviesUrl(m.slug),
			bigPoster: m.bigPoster,
			subTitle: getGenresList(m.genres),
			title: m.title,
		}))

		const actors: IGalleryItem[] = dataActors.slice(0, 7).map(a => ({
			name: a.name,
			posterPath: a.photo,
			link: getActorsUrl(a.slug),
			content: {
				title: a.name,
				subTitle: `+${a.countMovies} movies`,
			},
		}))

		const trendingMovies: IGalleryItem[] = dataTrendingMovies
			.slice(0, 7)
			.map(m => ({
				name: m.title,
				posterPath: m.poster,
				link: getMoviesUrl(m.slug),
			}))

		return {
			props: {
				slides,
				actors,
				trendingMovies,
			} as IHome,
			revalidate: 60,
		}
	} catch (error) {
		return {
			props: {
				slides: [],
				actors: [],
				trendingMovies: [],
			},
		}
	}
}

export default HomePage
