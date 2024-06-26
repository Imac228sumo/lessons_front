import { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'
import { MovieService } from '@/services/movie/movie.service'
import { IMovie } from '@/shared/types/movie.interface'

const FreshPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title='Fresh movies'
			description='New movies and series in excellent quality: legal, safe, without ads'
		/>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movies } = await MovieService.getAllMovies()

		return {
			props: { movies },
			revalidate: 60,
		}
	} catch (e) {
		// console.log(errorCatch(e))

		return {
			notFound: true,
		}
	}
}

export default FreshPage
