import { FC } from 'react'
import { FieldError, FormState, UseFormRegister } from 'react-hook-form'

import Field from '@/components/ui/form-elements/field/Field'
import { validEmail } from '@/shared/regex'

interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<any>
	isPasswordRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({
	register,
	formState: { errors },
	isPasswordRequired = false,
}) => {
	return (
		<>
			<Field
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email address',
					},
				})}
				placeholder='E-mail'
				error={errors.email as FieldError}
			/>

			<Field
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Min length should more 6 symbols',
								},
							}
						: {}
				)}
				placeholder='Password'
				type='password'
				error={errors.password as FieldError}
			/>
		</>
	)
}

export default AuthFields
