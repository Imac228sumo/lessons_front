import { FC } from 'react'

import styles from './Home.module.scss'
import { IHome } from './home.interface'
import Gallery from '@/components/ui/gallery/Gallery'
import Heading from '@/components/ui/heading/Heading'
import SubHeading from '@/components/ui/heading/SubHeading'
import Slider from '@/components/ui/slider/Slider'
import { Meta } from '@/utils/meta/Meta'

export const Home: FC<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<Meta
			title='Watch movies online'
			description='Watch MovieApp movies and TV shows online or stream right to your browser.'
		>
			<Heading title='Watch movies online' className={styles.heading} />

			{slides.length && <Slider slides={slides} />}

			<div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
				<SubHeading title='Trending now' />
				{trendingMovies.length && <Gallery items={trendingMovies} />}
			</div>

			<div>
				<SubHeading title='Best actors' />
				{actors.length && <Gallery items={actors} />}
			</div>
		</Meta>
	)
}
