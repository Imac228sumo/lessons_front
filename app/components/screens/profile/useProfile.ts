import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { IProfileInput } from './profile.interface'
import { UserService } from '@/services/user/user.service'
import { toastError } from '@/utils/toast-error/toast-error'

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
	const {
		isLoading,
		error: errorGetProfile,
		data,
	} = useQuery({
		queryKey: ['profile'],
		queryFn: () => UserService.getProfile(),
	})

	useEffect(() => {
		if (data?.data) {
			setValue('email', data.data.email)
		}
	}, [data, setValue])

	useEffect(() => {
		if (errorGetProfile) {
			toastError(errorGetProfile, 'Get profile')
		}
	}, [errorGetProfile])

	const { mutateAsync, error: errorUpdateProfile } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: IProfileInput) => UserService.updateProfile(data),
		onSuccess() {
			toastr.success('Update profile', 'update was successful')
		},
	})

	useEffect(() => {
		if (errorUpdateProfile) {
			toastError(errorUpdateProfile, 'Get profile')
		}
	}, [errorUpdateProfile])

	const onSubmit: SubmitHandler<IProfileInput> = async data => {
		// Фильтрация пустых значений
		const filteredData: IProfileInput = Object.fromEntries(
			Object.entries(data).filter(([key, value]) => value !== '')
		) as IProfileInput
		await mutateAsync(filteredData)
	}

	return { onSubmit, isLoading }
}
