import { GetStaticProps, NextPage } from 'next'

import Error404 from './404'
import { ICollection } from '@/components/screens/collections/collections.interface'
import Collections from '@/screens/collections/Collections'
import { GenreService } from '@/services/genre/genre.service'

const GenresPage: NextPage<{ collections: ICollection[] }> = ({
	collections,
}) => {
	return collections ? (
		<Collections collections={collections || []} />
	) : (
		<Error404 />
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: collections } = await GenreService.getCollections()

		return {
			props: { collections },
			revalidate: 60,
		}
	} catch (e) {
		// console.log(errorCatch(e))

		return {
			props: {},
			// notFound: true,
		}
	}
}

export default GenresPage
