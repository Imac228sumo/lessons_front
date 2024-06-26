import { FC } from 'react'

import styles from './SubHeading.module.scss'

const SubHeading: FC<{ title: string }> = ({ title }) => {
	return <h2 className={styles.sub_heading}>{title}</h2>
}

export default SubHeading
