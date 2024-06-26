import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { ActorService } from '@/services/actor/actor.service'
import { IOption } from '@/ui/select/select.interface'
import { toastError } from '@/utils/toast-error/toast-error'

export const useAdminActors = () => {
	const queryData = useQuery({
		queryKey: ['list of actor'],
		queryFn: () => ActorService.getAllActors(),
		select: ({ data }) =>
			data.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor._id,
				})
			),
	})

	useEffect(() => {
		if (queryData.error) {
			toastError(queryData.error, 'actor list')
		}
	}, [queryData.error])

	return queryData
}
