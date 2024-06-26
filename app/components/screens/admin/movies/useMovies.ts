import { useMutation, useQuery } from '@tanstack/react-query'
import { getAdminUrl } from 'configs/url.config'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { useDebounce } from '@/hooks/useDebounce'
import { MovieService } from '@/services/movie/movie.service'
import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'
import { getGenresList } from '@/utils/movie/getGenresList'
import { toastError } from '@/utils/toast-error/toast-error'

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery({
		queryKey: ['movie list', debouncedSearch],
		queryFn: () => MovieService.getAllMovies(debouncedSearch),
		select: ({ data }) =>
			data.map(
				(movie): ITableItem => ({
					_id: movie._id,
					editUrl: getAdminUrl(`movie/edit/${movie._id}`),
					items: [
						movie.title,
						getGenresList(movie.genres),
						String(movie.rating),
					],
				})
			),
	})

	useEffect(() => {
		if (queryData.error) {
			toastError(queryData.error, 'Movie list')
		}
	}, [queryData.error])

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync, error: createError } = useMutation({
		mutationKey: ['create movie'],
		mutationFn: () => MovieService.createMovie(),
		onSuccess({ data: _id }) {
			toastr.success('Create movie', 'create was successful')
			push(getAdminUrl(`movie/edit/${_id}`))
		},
	})

	useEffect(() => {
		if (createError) {
			toastError(createError, 'Create movie')
		}
	}, [createError])

	const { mutateAsync: deleteAsync, error: deleteError } = useMutation({
		mutationKey: ['delete movie'],
		mutationFn: (movieId: string) => MovieService.deleteMovie(movieId),
		onSuccess() {
			toastr.success('Delete movie', 'delete was successful')
			queryData.refetch()
		},
	})

	useEffect(() => {
		if (deleteError) {
			toastError(deleteError, 'Delete movie')
		}
	}, [deleteError])

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
