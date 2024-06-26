import { FC } from 'react'
import { useForm } from 'react-hook-form'

import AuthFields from '../auth/AuthFields'

import styles from './Profile.module.scss'
import { IProfileInput } from './profile.interface'
import { useProfile } from './useProfile'
import SkeletonLoader from '@/components/ui/SkeletonLoader/SkeletonLoader'
import Button from '@/components/ui/form-elements/button/Button'
import Heading from '@/components/ui/heading/Heading'
import { Meta } from '@/utils/meta/Meta'

const Profile: FC = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useProfile(setValue)

	return (
		<Meta title='Profile'>
			<Heading title='Profile' />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<AuthFields
						register={register}
						formState={formState}
						isPasswordRequired={false}
					/>
				)}

				<Button>Update</Button>
			</form>
		</Meta>
	)
}

export default Profile
