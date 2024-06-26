import { useMutation, useQuery } from '@tanstack/react-query'
import { getAdminUrl } from 'configs/url.config'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { useDebounce } from '@/hooks/useDebounce'
import { GenreService } from '@/services/genre/genre.service'
import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'
import { toastError } from '@/utils/toast-error/toast-error'

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery({
		queryKey: ['genre list', debouncedSearch],
		queryFn: () => GenreService.getAllGenres(debouncedSearch),
		select: ({ data }) =>
			data.map(
				(genre): ITableItem => ({
					_id: genre._id,
					editUrl: getAdminUrl(`genre/edit/${genre._id}`),
					items: [genre.name, genre.slug],
				})
			),
	})

	useEffect(() => {
		if (queryData.error) {
			toastError(queryData.error, 'Genre list')
		}
	}, [queryData.error])

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync, error: createError } = useMutation({
		mutationKey: ['create genre'],
		mutationFn: () => GenreService.createGenre(),
		onSuccess({ data: _id }) {
			toastr.success('Create genre', 'create was successful')
			push(getAdminUrl(`genre/edit/${_id}`))
		},
	})

	useEffect(() => {
		if (createError) {
			toastError(createError, 'Create genre')
		}
	}, [createError])

	const { mutateAsync: deleteAsync, error: deleteError } = useMutation({
		mutationKey: ['delete genre'],
		mutationFn: (genreId: string) => GenreService.deleteGenre(genreId),
		onSuccess() {
			toastr.success('Delete genre', 'delete was successful')
			queryData.refetch()
		},
	})

	useEffect(() => {
		if (deleteError) {
			toastError(deleteError, 'Delete genre')
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
