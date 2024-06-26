import { useMutation, useQuery } from '@tanstack/react-query'
import { getAdminUrl } from 'configs/url.config'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { useDebounce } from '@/hooks/useDebounce'
import { ActorService } from '@/services/actor/actor.service'
import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'
import { toastError } from '@/utils/toast-error/toast-error'

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery({
		queryKey: ['actor list', debouncedSearch],
		queryFn: () => ActorService.getAllActors(debouncedSearch),
		select: ({ data }) =>
			data.map(
				(actor): ITableItem => ({
					_id: actor._id,
					editUrl: getAdminUrl(`actor/edit/${actor._id}`),
					items: [actor.name, String(actor.countMovies)],
				})
			),
	})

	useEffect(() => {
		if (queryData.error) {
			toastError(queryData.error, 'Actor list')
		}
	}, [queryData.error])

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync, error: createError } = useMutation({
		mutationKey: ['create actor'],
		mutationFn: () => ActorService.createActor(),
		onSuccess({ data: _id }) {
			toastr.success('Create actor', 'create was successful')
			push(getAdminUrl(`actor/edit/${_id}`))
		},
	})

	useEffect(() => {
		if (createError) {
			toastError(createError, 'Create actor')
		}
	}, [createError])

	const { mutateAsync: deleteAsync, error: deleteError } = useMutation({
		mutationKey: ['delete actor'],
		mutationFn: (actorId: string) => ActorService.deleteActor(actorId),
		onSuccess() {
			toastr.success('Delete actor', 'delete was successful')
			queryData.refetch()
		},
	})

	useEffect(() => {
		if (deleteError) {
			toastError(deleteError, 'Delete actor')
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
