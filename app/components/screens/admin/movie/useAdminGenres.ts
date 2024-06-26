import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { GenreService } from '@/services/genre/genre.service'
import { IOption } from '@/ui/select/select.interface'
import { toastError } from '@/utils/toast-error/toast-error'

export const useAdminGenres = () => {
	const queryData = useQuery({
		queryKey: ['list of genre'],
		queryFn: () => GenreService.getAllGenres(),
		select: ({ data }) =>
			data.map(
				(genre): IOption => ({
					label: genre.name,
					value: genre._id,
				})
			),
	})

	useEffect(() => {
		if (queryData.error) {
			toastError(queryData.error, 'genre list')
		}
	}, [queryData.error])

	return queryData
}
