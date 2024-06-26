import { useQuery } from '@tanstack/react-query'
import { getGenresUrl } from 'configs/url.config'
import { useEffect } from 'react'

import { IMenuItem } from '../menu.interface'

import { GenreService } from '@/services/genre/genre.service'
import { toastError } from '@/utils/toast-error/toast-error'

export const usePopularGenres = () => {
	const queryData = useQuery({
		queryKey: ['popular genre menu'],
		queryFn: () => GenreService.getAllGenres(),
		select: ({ data }) => {
			return data
				.filter(genre => genre.icon)
				.map(
					genre =>
						({
							icon: genre.icon,
							link: getGenresUrl(genre.slug),
							title: genre.name,
						}) as IMenuItem
				)
				.splice(0, 4)
		},
	})

	useEffect(() => {
		if (queryData.error) {
			toastError(queryData.error, 'Popular genres')
		}
	}, [queryData.error])

	return queryData
}
