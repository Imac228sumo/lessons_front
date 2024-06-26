import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

import { FileService } from '@/services/file/file.service'
import { toastError } from '@/utils/toast-error/toast-error'

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder?: string
) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false)

	const { mutateAsync, error: errorUploadFile } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => FileService.uploadFile(data, folder),
		onSuccess({ data }) {
			onChange(data[0].url)
		},
	})

	useEffect(() => {
		if (errorUploadFile) {
			toastError(errorUploadFile, 'Upload file')
		}
	}, [errorUploadFile])

	const uploadFile = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)
			const files = e.target.files
			if (files?.length) {
				const formData = new FormData()
				formData.append('file', files[0])
				await mutateAsync(formData)

				setTimeout(() => {
					setIsLoading(false)
				}, 1000)
			}
		},
		[mutateAsync]
	)

	return useMemo(() => ({ uploadFile, isLoading }), [uploadFile, isLoading])
}
