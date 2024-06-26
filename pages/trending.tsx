import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'
import { MovieService } from '@/services/movie/movie.service'

const TrendingPage: NextPage = () => {
	const { data: popularMovies } = useQuery({
		queryKey: ['Popular movies'],
		queryFn: () => MovieService.getMostPopularMovies(),
	})

	return (
		<Catalog
			movies={popularMovies || []}
			title='Trending movies'
			description='Trending movies in excellent quality: legal, safe, without ads'
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const queryClient = new QueryClient()

	await queryClient.fetchQuery({
		queryKey: ['Popular movies'],
		queryFn: () => MovieService.getMostPopularMovies(),
	})

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export default TrendingPage
