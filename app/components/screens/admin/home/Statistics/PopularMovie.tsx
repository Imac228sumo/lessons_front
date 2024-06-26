import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import { getMoviesUrl } from 'configs/url.config'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from '../Admin.module.scss'

import SkeletonLoader from '@/components/ui/SkeletonLoader/SkeletonLoader'
import SubHeading from '@/components/ui/heading/SubHeading'
import { MovieService } from '@/services/movie/movie.service'
import { IMovie } from '@/shared/types/movie.interface'

const PopularMovie: FC = () => {
	const { isLoading, data: movie } = useQuery({
		queryKey: ['Most popular movies in admin'],
		queryFn: () => MovieService.getMostPopularMovies(),
		select: (data): IMovie => data[0],
	})

	return (
		<div className={cn(styles.block, styles.popular)}>
			<SubHeading title='The most popular movie' />
			{isLoading ? (
				<SkeletonLoader className={styles.loader} />
			) : (
				movie && (
					<>
						<h3>Opened {movie.countOpened} times</h3>
						<Link href={getMoviesUrl(movie.slug)}>
							<Image
								width={285}
								height={176}
								src={movie.bigPoster}
								alt={movie.title}
								className={styles.image}
								unoptimized
							/>
						</Link>
					</>
				)
			)}
		</div>
	)
}

export default PopularMovie
