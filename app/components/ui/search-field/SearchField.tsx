import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'

import MaterialIcon from '../MaterialIcon/MaterialIcon'

import styles from './SearchField.module.scss'

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
	setIsOpen?: Dispatch<SetStateAction<boolean>>
}

const SearchField: FC<ISearchField> = ({
	searchTerm,
	handleSearch,
	setIsOpen,
}) => {
	return (
		<div className={styles.search}>
			<MaterialIcon name='MdSearch' />
			<input
				placeholder='Search'
				value={searchTerm}
				onChange={handleSearch}
				onClick={
					(setIsOpen &&
						Object.prototype.toString.call(setIsOpen) === '[object Function]' &&
						(() => setIsOpen(true))) ||
					undefined
				}
			/>
		</div>
	)
}
export default SearchField
