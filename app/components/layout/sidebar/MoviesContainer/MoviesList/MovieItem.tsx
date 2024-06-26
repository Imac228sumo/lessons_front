import { getGenresUrl, getMoviesUrl } from 'configs/url.config'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './MovieList.module.scss'
import MaterialIcon from '@/components/ui/MaterialIcon/MaterialIcon'
import { IMovie } from '@/shared/types/movie.interface'
import { getGenresListEach } from '@/utils/movie/getGenresList'

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.item}>
			<Link href={getMoviesUrl(movie.slug)}>
				<Image
					alt={movie.title}
					width={65}
					height={97}
					src={movie.poster}
					draggable={false}
					priority
				/>
			</Link>
			<div className={styles.info}>
				<div>
					<div className={styles.title}>{movie.title}</div>
					<div className={styles.genres}>
						{movie.genres.map((genre, index) => (
							<Link key={genre._id} href={getGenresUrl(genre.slug)}>
								{getGenresListEach(index, movie.genres.length, genre.name)}
							</Link>
						))}
					</div>
				</div>
				<div className={styles.rating}>
					<MaterialIcon name='MdStarRate' />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</div>
	)
}

export default MovieItem
