import { useMutation, useQuery } from '@tanstack/react-query'
import { getAdminUrl } from 'configs/url.config'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface'
import { useDebounce } from '@/hooks/useDebounce'
import { UserService } from '@/services/user/user.service'
import { convertMongoDate } from '@/utils/date/convertMongoDate'
import { toastError } from '@/utils/toast-error/toast-error'

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery({
		queryKey: ['users list', debouncedSearch],
		queryFn: () => {
			return UserService.getAllUsers(debouncedSearch)
		},
		select: ({ data }) =>
			data.map(
				(user): ITableItem => ({
					_id: user._id,
					editUrl: getAdminUrl(`user/edit/${user._id}`),
					items: [user.email, convertMongoDate(user.createdAt)],
				})
			),
		// enabled: !!debouncedSearch, //если нет  debouncedSearch хук не будет работать никогда
	})

	useEffect(() => {
		if (queryData.error) {
			toastError(queryData.error, 'User list')
		}
	}, [queryData.error])

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync, error: errorDeleteUser } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (userId: string) => {
			return UserService.deleteUser(userId)
		},
		onSuccess: () => {
			toastr.success('Delete user', 'delete was successful'),
				queryData.refetch()
		},
	})

	useEffect(() => {
		if (errorDeleteUser) {
			toastError(errorDeleteUser, 'Delete user')
		}
	}, [errorDeleteUser])

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
		}),
		[queryData, searchTerm, deleteAsync]
	)
}
