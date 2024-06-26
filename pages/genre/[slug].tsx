// import { errorCatch } from 'api/api.helpers'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Error404 from '../404'

import { IGenrePage } from '@/components/screens/genre/genre.interface'
import Genre from '@/screens/genre/Genre'
import { GenreService } from '@/services/genre/genre.service'
import { MovieService } from '@/services/movie/movie.service'

const GenrePage: NextPage<IGenrePage> = ({ genre, movies }) => {
	return genre ? <Genre genre={genre} movies={movies} /> : <Error404 />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await GenreService.getAllGenres()
		const paths = genres.map(g => ({
			params: { slug: g.slug },
		}))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (e) {
		// console.log(errorCatch(e))

		return {
			paths: [],
			fallback: false, // чтобы делать повторный запрос на сервер если по slug ничего не найдено
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: genre } = await GenreService.getGenreBySlug(
			String(params?.slug)
		)

		const { data: movies } = await MovieService.getMovieByGenres([genre._id])

		return {
			props: { movies, genre },
			revalidate: 60,
		}
	} catch (e) {
		// console.log(errorCatch(e))

		return {
			props: {},
			// notFound: true,
		}
	}
}

export default GenrePage
