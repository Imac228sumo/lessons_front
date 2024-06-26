import { FC, PropsWithChildren } from 'react'

import styles from './Layout.module.scss'
import Navigation from './navigation/Navigation'
import Sidebar from './sidebar/Sidebar'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Navigation />
			<div className={styles.center}>{children}</div>
			<Sidebar />
		</div>
	)
}

export default Layout
