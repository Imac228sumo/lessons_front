import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { IUserEditInput } from './user-edit.interface'
import { getAdminUrl } from '@/configs/url.config'
import { UserService } from '@/services/user/user.service'
import { toastError } from '@/utils/toast-error/toast-error'

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const { query, push } = useRouter()

	const userId = String(query.id)

	const {
		isLoading,
		error: errorGetUserById,
		data,
	} = useQuery({
		queryKey: ['user', userId],
		queryFn: () => UserService.getUserById(userId),
		enabled: !!query.id,
	})

	useEffect(() => {
		if (data?.data) {
			setValue('email', data.data.email)
			setValue('isAdmin', data.data.isAdmin)
		}
	}, [data, setValue])

	useEffect(() => {
		if (errorGetUserById) {
			toastError(errorGetUserById, 'Get user byId')
		}
	}, [errorGetUserById])

	const { mutateAsync, error: errorUpdateUser } = useMutation({
		mutationKey: ['update user'],
		mutationFn: (data: IUserEditInput) => UserService.updateUser(userId, data),
		onSuccess() {
			toastr.success('Update user', 'update was successful')
			push(getAdminUrl('users'))
		},
	})
	useEffect(() => {
		if (errorUpdateUser) {
			toastError(errorUpdateUser, 'Update user')
		}
	}, [errorUpdateUser])

	const onSubmit: SubmitHandler<IUserEditInput> = async data => {
		const filteredData: IUserEditInput = Object.fromEntries(
			Object.entries(data).filter(([key, value]) => value !== '')
		) as IUserEditInput
		await mutateAsync(filteredData)
	}

	return { onSubmit, isLoading }
}
