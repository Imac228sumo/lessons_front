import { FC } from 'react'

import { useUsers } from './useUsers'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'
import { Meta } from '@/utils/meta/Meta'

const UserList: FC = () => {
	const { handleSearch, isLoading, deleteAsync, searchTerm, data } = useUsers()

	return (
		<Meta title='Users'>
			<AdminNavigation />
			<Heading title='Users' />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				headerItems={['Email', 'Date register']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default UserList
