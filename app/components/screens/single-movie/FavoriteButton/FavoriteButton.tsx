import { useMutation } from '@tanstack/react-query'
import cn from 'classnames'
import { FC, useEffect, useState } from 'react'

import { useFavorites } from '../../favorites/useFavorites'

import styles from './FavoriteButton.module.scss'
import { UserService } from '@/services/user/user.service'
import { toastError } from '@/utils/toast-error/toast-error'

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState(false)
	const { favoritesMovies, refetch } = useFavorites()

	useEffect(() => {
		if (favoritesMovies) {
			const isHasMovie = favoritesMovies.some(f => f._id === movieId)
			if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie)
		}
	}, [favoritesMovies, isSmashed, movieId])

	const { mutateAsync, error: errorToggleFavorite } = useMutation({
		mutationKey: ['update actor'],
		mutationFn: () => UserService.toggleFavorite(movieId),
		onSuccess() {
			setIsSmashed(!isSmashed)
			refetch()
		},
	})

	useEffect(() => {
		if (errorToggleFavorite)
			[toastError(errorToggleFavorite, 'Update favorite list')]
	}, [errorToggleFavorite])

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isSmashed,
			})}
			style={{ backgroundImage: `url('/heart-animation.png')` }}
		/>
	)
}

export default FavoriteButton
