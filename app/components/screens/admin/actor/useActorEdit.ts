import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { IActorEditInput } from './actor-edit.interface'
import { getAdminUrl } from '@/configs/url.config'
import { ActorService } from '@/services/actor/actor.service'
import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error/toast-error'

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const { query, push } = useRouter()

	const actorId = String(query.id)

	const {
		isLoading,
		data,
		error: errorGetActorById,
	} = useQuery({
		queryKey: ['actor', actorId],
		queryFn: () => ActorService.getActorById(actorId),
		enabled: !!query.id,
	})

	useEffect(() => {
		if (errorGetActorById) {
			toastError(errorGetActorById, 'Get actor byId')
		}
	}, [errorGetActorById])

	useEffect(() => {
		if (data?.data) {
			getKeys(data?.data).forEach(key => {
				setValue(key, data?.data[key])
			})
		}
	}, [data]) //eslint-disable-line

	const { mutateAsync, error: errorUpdateActor } = useMutation({
		mutationKey: ['update actor'],
		mutationFn: (data: IActorEditInput) =>
			ActorService.updateActor(actorId, data),
		onSuccess() {
			toastr.success('Update actor', 'update was successful')
			push(getAdminUrl('actors'))
		},
	})

	useEffect(() => {
		if (errorUpdateActor) {
			toastError(errorUpdateActor, 'Update actor')
		}
	}, [errorUpdateActor])

	const onSubmit: SubmitHandler<IActorEditInput> = async data => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
