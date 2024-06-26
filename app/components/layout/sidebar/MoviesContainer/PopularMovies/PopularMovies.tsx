import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

import MovieList from '../MoviesList/MovieList'

import styles from './PopularMovies.module.scss'
import SkeletonLoader from '@/components/ui/SkeletonLoader/SkeletonLoader'
import { MovieService } from '@/services/movie/movie.service'

const PopularMovies: FC = () => {
	const { isLoading, data } = useQuery({
		queryKey: ['Popular movies in sidebar'],
		queryFn: () => MovieService.getMostPopularMovies(),
		select: data => data.slice(0, 3),
	})

	return isLoading ? (
		<div className={styles.loader}>
			<SkeletonLoader count={3} className={styles.skeleton_loader} />
		</div>
	) : (
		<MovieList
			list={{
				link: '/trending',
				movies: data || [],
				title: 'Popular movies',
			}}
		/>
	)
}
export default PopularMovies
