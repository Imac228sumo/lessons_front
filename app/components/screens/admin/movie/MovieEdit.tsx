import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { IMovieEditInput } from './movie-edit.interface'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'
import { useMovieEdit } from './useMovieEdit'
import SkeletonLoader from '@/components/ui/SkeletonLoader/SkeletonLoader'
import formStyles from '@/components/ui/form-elements/adminForm.module.scss'
import Button from '@/components/ui/form-elements/button/Button'
import Field from '@/components/ui/form-elements/field/Field'
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import SlugField from '@/ui/form-elements/SlugField/SlugField'
import UploadField from '@/ui/form-elements/UploadField/UploadField'
import Heading from '@/ui/heading/Heading'
import { Meta } from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
	ssr: false,
})

const MovieEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	})

	const { onSubmit, isLoading } = useMovieEdit(setValue)
	const { data: genres, isLoading: isGenresLoading } = useAdminGenres()
	const { data: actors, isLoading: isActorsLoading } = useAdminActors()

	return (
		<Meta title='Edit movie'>
			<AdminNavigation />
			<Heading title='Edit movie' />
			{isLoading ? (
				<SkeletonLoader count={5} />
			) : (
				<div className={formStyles.form}>
					<div className={formStyles.fields}>
						<Field
							{...register('title', {
								required: 'Title is required!',
							})}
							placeholder='Title'
							error={errors.title}
						/>
						<SlugField
							generate={() =>
								setValue('slug', generateSlug(getValues('title')))
							}
							register={register}
							error={errors.slug}
						/>
						<Field
							{...register('parameters.country', {
								required: 'Country is required!',
							})}
							placeholder='Country'
							error={errors.parameters?.country}
							style={{ width: '31%' }}
						/>
						<Field
							{...register('parameters.duration', {
								required: 'Duration is required!',
							})}
							placeholder='Duration (min.)'
							error={errors.parameters?.duration}
							style={{ width: '31%' }}
						/>
						<Field
							{...register('parameters.year', {
								required: 'Year is required!',
							})}
							placeholder='Year'
							error={errors.parameters?.year}
							style={{ width: '31%' }}
						/>

						<Controller
							name='genres'
							control={control}
							rules={{
								required: 'Please select at least one genre!',
							}}
							render={({ field, fieldState: { error } }) => (
								<DynamicSelect
									error={error}
									field={field}
									placeholder='Genres'
									options={genres || []}
									isLoading={isGenresLoading}
									isMulti
								/>
							)}
						/>
						<Controller
							name='actors'
							control={control}
							rules={{
								required: 'Please select at least one actor!',
							}}
							render={({ field, fieldState: { error } }) => (
								<DynamicSelect
									error={error}
									field={field}
									placeholder='Actors'
									options={actors || []}
									isLoading={isActorsLoading}
									isMulti
								/>
							)}
						/>

						<Controller
							name='poster'
							control={control}
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									placeholder='Poster'
									error={error}
									folder='movies'
									value={value}
									onChange={onChange}
									isImage={true}
								/>
							)}
							rules={{
								required: 'Poster is required!',
							}}
						/>

						<Controller
							name='bigPoster'
							control={control}
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									placeholder='Big poster'
									error={error}
									folder='movies'
									value={value}
									onChange={onChange}
									isImage={true}
								/>
							)}
							rules={{
								required: 'Big poster is required!',
							}}
						/>

						<Controller
							name='videoUrl'
							control={control}
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									placeholder='Video'
									error={error}
									folder='movies'
									value={value}
									onChange={onChange}
									style={{ marginTop: -25 }}
									isVideo={true}
								/>
							)}
							rules={{
								required: 'Video is required!',
							}}
						/>
					</div>

					<Button onClick={handleSubmit(onSubmit)}>Update</Button>
				</div>
			)}
		</Meta>
	)
}

export default MovieEdit
//onSubmit={}
