import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Error404 from '../404'

import SingleMovie from '@/components/screens/single-movie/SingleMovie'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { getMoviesUrl } from '@/configs/url.config'
import { MovieService } from '@/services/movie/movie.service'
import { IMovie } from '@/shared/types/movie.interface'

const SingleMoviePage: NextPage<{
	movie: IMovie | undefined
	similarMovies: IGalleryItem[]
}> = ({ movie, similarMovies }) => {
	return movie ? (
		<SingleMovie movie={movie} similarMovies={similarMovies || []} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getAllMovies()
		const paths = movies.map(movie => ({
			params: { slug: movie.slug },
		}))

		return { paths, fallback: 'blocking' }
	} catch {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getMovieBySlug(
			String(params?.slug)
		)

		const responseSimilarMovies = await MovieService.getMovieByGenres(
			movie.genres.map(g => g._id)
		)

		const similarMovies: IGalleryItem[] = responseSimilarMovies.data
			.filter(m => m._id !== movie._id)
			.map(m => ({
				name: m.title,
				posterPath: m.poster,
				link: getMoviesUrl(m.slug),
			}))

		return {
			props: { movie, similarMovies },
			revalidate: 60,
		}
	} catch (e) {
		//console.log(errorCatch(e))

		return {
			notFound: true,
		}
	}
}

export default SingleMoviePage
