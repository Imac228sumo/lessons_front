import { FC, useRef, useState } from 'react'

import styles from './Search.module.scss'
import SearchList from './SearchList/SearchList'
import { useSearch } from './useSearch'
import SearchField from '@/components/ui/search-field/SearchField'
import { useClickAway } from '@/hooks/useClickAway'

const Search: FC = () => {
	const { data, isSuccess, searchTerm, handleSearch } = useSearch()

	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef<HTMLDivElement | null>(null)
	useClickAway(ref, setIsOpen)

	return (
		<div className={styles.wrapper} ref={ref}>
			<SearchField
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				setIsOpen={setIsOpen}
			/>
			{isSuccess && isOpen && <SearchList movies={data || []} />}
		</div>
	)
}
export default Search
