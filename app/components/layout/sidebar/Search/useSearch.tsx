import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'
import { MovieService } from '@/services/movie/movie.service'

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { data, isSuccess } = useQuery({
		queryKey: ['search movie list', debouncedSearch],
		queryFn: () => {
			return MovieService.getAllMovies(debouncedSearch)
		},
		select: ({ data }) => data,
		enabled: !!debouncedSearch, //если нет  debouncedSearch хук не будет работать никогда
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return { data, isSuccess, handleSearch, searchTerm }
}
