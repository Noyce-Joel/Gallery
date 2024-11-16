import { SetStateAction, useState } from 'react'

import { SearchResult } from '@/lib/types'
import { handleImageLoad } from '@/lib/utils/image'

import { useSlideshowNav } from './useSlideshowNav'

interface UseSlideShowProps {
	selectedImages: SearchResult[]
}

interface UseSlideShowReturn {
	index: number
	handleNext: () => void
	handlePrev: () => void
}

export const useSlideShow = ({
	selectedImages,
}: UseSlideShowProps): UseSlideShowReturn => {
	const [index, setIndex] = useState<number>(0)

	const handleNext = () => {
		setIndex((prevIndex) =>
			prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1,
		)
	}

	const handlePrev = () => {
		setIndex((prevIndex) =>
			prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1,
		)
	}

	let nav = useSlideshowNav(handleNext, handlePrev)

	return {
		index,
		handleNext,
		handlePrev,
	}
}
