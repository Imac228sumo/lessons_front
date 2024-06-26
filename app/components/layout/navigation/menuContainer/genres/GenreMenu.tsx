import { FC } from 'react'

import Menu from '../Menu'

import styles from './Genre.module.scss'
import { usePopularGenres } from './usePopularGenres'
import SkeletonLoader from '@/components/ui/SkeletonLoader/SkeletonLoader'

const GenreMenu: FC = () => {
	const { isLoading, data } = usePopularGenres()

	return isLoading ? (
		<div className={styles.loader_container}>
			<SkeletonLoader count={5} className={styles.loader} />
		</div>
	) : (
		<Menu menu={{ title: 'Popular genres', items: data || [] }} />
	)
}
export default GenreMenu
