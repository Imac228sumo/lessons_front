import { FC } from 'react'

import FavoriteButton from '../FavoriteButton/FavoriteButton'

import styles from './Content.module.scss'
import ContentList from './ContentList/ContentList'
// import FavoriteButton from '../FavoriteButton/FavoriteButton'
import MaterialIcon from '@/components/ui/MaterialIcon/MaterialIcon'
import { getActorsUrl, getGenresUrl } from '@/configs/url.config'
import { useAuth } from '@/hooks/useAuth'
import { IMovie } from '@/shared/types/movie.interface'

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
	const { user } = useAuth()
	return (
		<div className={styles.content}>
			<h1>{movie.title}</h1>
			{user && <FavoriteButton movieId={movie._id} />}
			<div className={styles.rating}>
				<MaterialIcon name='MdStarRate' />
				<span>{movie.rating.toFixed(1)}</span>
			</div>
			<div className={styles.details}>
				<span>{movie.parameters.year} · </span>
				<span>{movie.parameters.country} · </span>
				<span>{movie.parameters.duration} min.</span>
			</div>
			<ContentList
				name='Genres'
				links={movie.genres.slice(0, 3).map(g => ({
					link: getGenresUrl(g.slug),
					title: g.name,
					_id: g._id,
				}))}
			/>
			<ContentList
				name='Actors'
				links={movie.actors.slice(0, 3).map(a => ({
					link: getActorsUrl(a.slug),
					title: a.name,
					_id: a._id,
				}))}
			/>
		</div>
	)
}

export default Content
