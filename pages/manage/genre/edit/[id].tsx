import { NextPageAuth } from 'providers/AuthProvider/auth.types'

import GenreEdit from '@/screens/admin/genre/GenreEdit'

const GenreEditPage: NextPageAuth = () => {
	return <GenreEdit />
}

GenreEditPage.isOnlyAdmin = true

export default GenreEditPage
