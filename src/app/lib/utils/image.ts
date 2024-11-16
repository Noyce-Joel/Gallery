import { SetStateAction } from 'react'

const getImageUrl = (publicId: string) =>
	`https://res.cloudinary.com/dhkbmh13s/image/upload/q_auto:best/v1705067761/${publicId}`

function getScreenHeight() {
	return window.innerHeight
}

function getImageWidth(
	imageWidth: number,
	imageHeight: number,
	screenHeight: number,
) {
	return (imageWidth / imageHeight) * screenHeight
}

const handleImageLoad = (
	idx: number,
	setLoadedImages: React.Dispatch<SetStateAction<boolean[]>>,
) => {
	setLoadedImages((prev) => {
		const newLoaded = [...prev]
		newLoaded[idx] = true
		return newLoaded
	})
}
export { getImageUrl, getScreenHeight, getImageWidth, handleImageLoad }
