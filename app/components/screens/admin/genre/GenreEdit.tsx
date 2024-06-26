import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import { IGenreEditInput } from './genre-edit.interface'
import { useGenreEdit } from './useGenreEdit'
import SkeletonLoader from '@/components/ui/SkeletonLoader/SkeletonLoader'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import formStyles from '@/components/ui/form-elements/adminForm.module.scss'
import Button from '@/components/ui/form-elements/button/Button'
import Field from '@/components/ui/form-elements/field/Field'
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Heading from '@/ui/heading/Heading'
import { Meta } from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

// "^[./]((?!scss).)*$",

const DynamicTextEditor = dynamic(
	() => import('@/ui/form-elements/textEditor/TextEditor'),
	{
		ssr: false,
	}
)

const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useGenreEdit(setValue)

	return (
		<Meta title='Edit genre'>
			<AdminNavigation />
			<Heading title='Edit genre' />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Name is required!',
								})}
								placeholder='Name'
								error={errors.name}
								style={{ width: '31%' }}
							/>

							<div style={{ width: '31%' }}>
								<SlugField
									generate={() =>
										setValue('slug', generateSlug(getValues('name')))
									}
									register={register}
									error={errors.slug}
								/>
							</div>

							<Field
								{...register('icon', {
									required: 'Icon is required!',
								})}
								placeholder='Icon'
								error={errors.icon}
								style={{ width: '31%' }}
							/>
						</div>
						<Controller
							name='description'
							control={control}
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<DynamicTextEditor
									placeholder='Description'
									onChange={onChange}
									error={error}
									value={value}
								/>
							)}
							rules={{
								validate: {
									required: v =>
										(v && stripHtml(v).result.length > 0) ||
										'Description is required!',
								},
							}}
						/>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default GenreEdit
