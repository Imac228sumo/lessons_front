import { NextPageAuth } from 'providers/AuthProvider/auth.types'

import UserList from '@/components/screens/admin/users/UserList'

const UserListPage: NextPageAuth = () => {
	return <UserList />
}

UserListPage.isOnlyAdmin = true

export default UserListPage
