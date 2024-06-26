import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { useAuth } from '@/hooks/useAuth'
import { RatingService } from '@/services/rating/rating.service'
import { toastError } from '@/utils/toast-error/toast-error'

export const useRateMovie = (movieId: string) => {
	const [rating, setRating] = useState(0)
	const [isSended, setIsSended] = useState(false)
	const { user } = useAuth()

	const {
		refetch, //чтобы перезагрузить данные после установки рейтинга
		data,
		error: errorGetRating,
	} = useQuery({
		queryKey: ['your movie rating', movieId],
		queryFn: () => RatingService.getRatingByUser(movieId),
		enabled: !!movieId && !!user,
	})

	useEffect(() => {
		if (errorGetRating) {
			toastError(errorGetRating, 'Get rating')
		}
	}, [errorGetRating])

	useEffect(() => {
		if (data?.data) {
			setRating(data.data)
		}
	}, [data])

	const { mutateAsync, error: errorSetRating } = useMutation({
		mutationKey: ['set rating movie'],
		mutationFn: ({ value }: { value: number }) =>
			RatingService.setRating(movieId, value),
		onSuccess() {
			toastr.success('Rate movie', 'You have successfully rated!')

			setIsSended(true)
			refetch()

			setTimeout(() => {
				setIsSended(false)
			}, 2400)
		},
	})
	useEffect(() => {
		if (errorSetRating) {
			toastError(errorSetRating, 'Set rating')
		}
	}, [errorSetRating])

	const handleClick = async (nextValue: number) => {
		setRating(nextValue)
		await mutateAsync({ value: nextValue })
	}

	return {
		isSended,
		rating,
		handleClick,
	}
}
