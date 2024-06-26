import { Dispatch, RefObject, SetStateAction, useEffect } from 'react'

export const useClickAway = (
	ref: RefObject<HTMLDivElement | null>,
	callback: Dispatch<SetStateAction<boolean>>
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				ref.current &&
				!ref.current.contains(event.target as HTMLDivElement)
			) {
				callback(false)
			}
		}

		document.addEventListener('click', handleClickOutside, true)

		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [ref, callback])
}
