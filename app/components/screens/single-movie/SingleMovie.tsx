import dynamic from 'next/dynamic'
import { FC } from 'react'

import Content from './Content/Content'
import { useUpdateCountOpened } from './useUpdateCountOpened'
import Banner from '@/components/ui/banner/Banner'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { IMovie } from '@/shared/types/movie.interface'
import Gallery from '@/ui/gallery/Gallery'
import SubHeading from '@/ui/heading/SubHeading'
import { Meta } from '@/utils/meta/Meta'

const DynamicPlayer = dynamic(() => import('@/ui/video-player/VideoPlayer'), {
	ssr: false,
})
const DynamicRateMovie = dynamic(() => import('./RateMovie/RateMovie'), {
	ssr: false,
})

const SingleMovie: FC<{ movie: IMovie; similarMovies: IGalleryItem[] }> = ({
	movie,
	similarMovies,
}) => {
	useUpdateCountOpened(movie.slug)

	return (
		<Meta title={movie.title} description={`Watch ${movie.title}`}>
			<Banner
				imagePath={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			<DynamicPlayer videoSource={movie.videoUrl} slug={movie.slug} />

			<div style={{ marginTop: '48px' }}>
				<SubHeading title='Similar' />
				<Gallery items={similarMovies} />
			</div>

			<DynamicRateMovie slug={movie.slug} _id={movie._id} />
		</Meta>
	)
}

export default SingleMovie
