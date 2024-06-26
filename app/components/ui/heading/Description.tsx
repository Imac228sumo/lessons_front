import cn from 'classnames'
import parse from 'html-react-parser'
import { FC } from 'react'

import styles from './Description.module.scss'

const Description: FC<{ text: string; className?: string }> = ({
	text,
	className = '',
}) => {
	return (
		<div className={cn(styles.description, className)}>
			<div>{parse(text)}</div>
		</div>
	)
}

export default Description
