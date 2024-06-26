import { getMoviesUrl } from 'configs/url.config'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './SearchList.module.scss'
import { IMovie } from '@/shared/types/movie.interface'

const SearchList: FC<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<div className={styles.list}>
			{movies.length ? (
				movies.map(movie => (
					<Link href={getMoviesUrl(movie.slug)} key={movie._id}>
						<Image
							src={movie.poster}
							alt={movie.title}
							width={50}
							height={50}
							objectFit='cover'
							objectPosition='top'
							draggable={false}
						/>
						<span>{movie.title}</span>
					</Link>
				))
			) : (
				<div className={styles.not_found}>Movies not found</div>
			)}
		</div>
	)
}
export default SearchList
