import Link from 'next/link'
import { FC } from 'react'

import styles from './AuthPlaceholder.module.scss'
import { getMoviesUrl } from '@/configs/url.config'

const AuthButton: FC<{ slug: string }> = ({ slug }) => {
	return (
		<Link className={styles.btn} href={`/auth?redirect=${getMoviesUrl(slug)}`}>
			Sign in
		</Link>
	)
}

export default AuthButton
