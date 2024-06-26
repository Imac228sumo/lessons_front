import { FC } from 'react'

import styles from './FavoriteMovies.module.scss'

const NotAuthFavorites: FC = () => {
	return (
		<div className={styles.notAuth}>For viewing favorites plz authorize!</div>
	)
}
export default NotAuthFavorites
