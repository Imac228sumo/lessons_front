import Link from 'next/link'
import { FC } from 'react'

import CollectionImage from './CollectionImage'
import styles from './Collections.module.scss'
import { ICollection } from './collections.interface'
import { getGenresUrl } from '@/configs/url.config'

const CollectionItem: FC<{ collection: ICollection }> = ({ collection }) => {
	return (
		<Link className={styles.collection} href={getGenresUrl(collection.slug)}>
			<CollectionImage collection={collection} />

			<div className={styles.content}>
				<div className={styles.title}>{collection.title}</div>
			</div>

			<div className={`${styles.behind} ${styles.second}`}>
				<CollectionImage collection={collection} />
			</div>

			<div className={`${styles.behind} ${styles.third}`}>
				<CollectionImage collection={collection} />
			</div>
		</Link>
	)
}

export default CollectionItem
