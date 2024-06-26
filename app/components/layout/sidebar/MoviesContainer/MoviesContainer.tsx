import dynamic from 'next/dynamic'
import { FC } from 'react'

import PopularMovies from './PopularMovies/PopularMovies'

const MoviesContainer: FC = () => {
	const DynamicFavoriteMovies = dynamic(
		() => import('../MoviesContainer/FavoriteMovies/FavoriteMovies'),
		{
			ssr: false,
		}
	)

	return (
		<div>
			<PopularMovies />
			<DynamicFavoriteMovies />
		</div>
	)
}
export default MoviesContainer
