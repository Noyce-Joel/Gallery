import { useEffect } from 'react'

export const useSlideshowNav = (handleNext: () => void, handlePrev: () => void) => {
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'ArrowRight') {
				return handleNext()
			}
			if (e.key === 'ArrowLeft') {
				return handlePrev()
			}
		}

		document.addEventListener('keydown', handleKey)

		return () => {
			document.removeEventListener('keydown', handleKey)
		}
	}, [handleNext, handlePrev])
}
