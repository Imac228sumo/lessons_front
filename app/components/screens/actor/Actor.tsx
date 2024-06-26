import { FC } from 'react'

import Catalog from '../templates/catalog-movies/Catalog'

import { IActorPage } from './actor.interface'

const Actor: FC<IActorPage> = ({ actor, movies }) => {
	return <Catalog movies={movies} title={actor.name} />
}

export default Actor
