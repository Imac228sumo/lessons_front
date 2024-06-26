import cn from 'classnames'
import { FC } from 'react'

import styles from './Heading.module.scss'
import { IHeading } from './heading.interface'

const Heading: FC<IHeading> = ({ title, className }) => {
	return <h1 className={cn(styles.h1, className)}>{title}</h1>
}
export default Heading
