import { FC } from 'react'

import MovieList from '../MoviesList/MovieList'

import styles from './FavoriteMovies.module.scss'
import NotAuthFavorites from './NotAuthFavorites'
import { useFavorites } from '@/components/screens/favorites/useFavorites'
import SkeletonLoader from '@/components/ui/SkeletonLoader/SkeletonLoader'
import { useAuth } from '@/hooks/useAuth'

const FavoriteMovies: FC = () => {
	const { isLoading, favoritesMovies } = useFavorites()
	const { user } = useAuth()

	if (!user) return <NotAuthFavorites />

	return isLoading ? (
		<div className={styles.loader}>
			<SkeletonLoader count={3} className={styles.skeletonLoader} />
		</div>
	) : (
		<MovieList
			list={{
				link: '/favorites',
				movies: favoritesMovies?.slice(0, 3) || [],
				title: 'Favorites',
			}}
		/>
	)
}
export default FavoriteMovies
