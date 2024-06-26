import { FC } from 'react'

import styles from './Navigation.module.scss'
import Logo from './logo/Logo'
import MenuContainer from './menuContainer/MenuContainer'

const Navigation: FC = () => {
	return (
		<div className={styles.navigation}>
			<Logo />
			<MenuContainer />
		</div>
	)
}

export default Navigation
