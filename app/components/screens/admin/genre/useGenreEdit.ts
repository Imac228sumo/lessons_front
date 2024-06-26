import { useMutation, useQuery } from '@tanstack/react-query'
import { getAdminUrl } from 'configs/url.config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { IGenreEditInput } from './genre-edit.interface'
import { GenreService } from '@/services/genre/genre.service'
import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error/toast-error'

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { query, push } = useRouter()

	const genreId = String(query.id)

	const {
		isLoading,
		data,
		error: errorGetGenreById,
	} = useQuery({
		queryKey: ['genre', genreId],
		queryFn: () => GenreService.getGenreById(genreId),
		enabled: !!query.id,
	})

	useEffect(() => {
		if (errorGetGenreById) {
			toastError(errorGetGenreById, 'Get genre byId')
		}
	}, [errorGetGenreById])

	useEffect(() => {
		if (data?.data) {
			getKeys(data.data).forEach(key => {
				setValue(key, (data?.data)[key])
			})
		}
	}, [data]) //eslint-disable-line

	const { mutateAsync, error: errorUpdateGenre } = useMutation({
		mutationKey: ['update genre'],
		mutationFn: (data: IGenreEditInput) =>
			GenreService.updateGenre(genreId, data),
		onSuccess() {
			toastr.success('Update genre', 'update was successful')
			push(getAdminUrl('genres'))
		},
	})

	useEffect(() => {
		if (errorUpdateGenre) {
			toastError(errorUpdateGenre, 'Update genre')
		}
	}, [errorUpdateGenre])

	const onSubmit: SubmitHandler<IGenreEditInput> = async data => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
