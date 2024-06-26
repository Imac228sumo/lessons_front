import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { IMovieEditInput } from './movie-edit.interface'
import { getAdminUrl } from '@/configs/url.config'
import { MovieService } from '@/services/movie/movie.service'
import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error/toast-error'

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { query, push } = useRouter()

	const movieId = String(query.id)

	const {
		data,
		isLoading,
		error: errorGetMovieById,
	} = useQuery({
		queryKey: ['movie', movieId],
		queryFn: () => MovieService.getMovieById(movieId),
		enabled: !!query.id,
	})

	useEffect(() => {
		if (errorGetMovieById) {
			toastError(errorGetMovieById, 'Get movie byId')
		}
	}, [errorGetMovieById])

	useEffect(() => {
		if (data?.data) {
			getKeys(data.data).forEach(key => {
				setValue(key, (data?.data)[key])
			})
		}
	}, [data]) //eslint-disable-line

	const { mutateAsync, error: errorUpdateMovie } = useMutation({
		mutationKey: ['update movie'],
		mutationFn: (data: IMovieEditInput) =>
			MovieService.updateMovie(movieId, data),
		onSuccess() {
			toastr.success('Update movie', 'update was successful')
			push(getAdminUrl('movies'))
		},
	})

	useEffect(() => {
		if (errorUpdateMovie) {
			toastError(errorUpdateMovie, 'Update movie')
		}
	}, [errorUpdateMovie])

	const onSubmit: SubmitHandler<IMovieEditInput> = async data => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
