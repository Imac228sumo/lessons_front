import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import { FC } from 'react'

import styles from '../Admin.module.scss'

import SkeletonLoader from '@/components/ui/SkeletonLoader/SkeletonLoader'
import { AdminService } from '@/services/admin/admin.service'

const CountUsers: FC = () => {
	const { isLoading, data: response } = useQuery({
		queryKey: ['Count users'],
		queryFn: () => AdminService.getCountUsers(),
	})

	return (
		<div className={cn(styles.block, styles.countUsers)}>
			<div>
				{isLoading ? (
					<SkeletonLoader />
				) : (
					<div className={styles.number}>
						{response?.data}
						<div className={styles.description}>users</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default CountUsers
