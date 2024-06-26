import Link from 'next/link'
import { FC } from 'react'

import styles from './Logo.module.scss'

const Logo: FC = () => {
	return (
		<div className={styles.logo}>
			<Link href='/' legacyBehavior>
				Logo
			</Link>
		</div>
	)
}
export default Logo
/*

						

*/
