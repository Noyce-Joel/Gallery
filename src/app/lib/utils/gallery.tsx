import router from 'next/router'

import { SearchResult } from '../types'
import { deleteImage } from './actions'
import { toast } from 'sonner'

const handleSelectMode = (
	selectMode: boolean,
	setSelectMode: React.Dispatch<React.SetStateAction<boolean>>,
	setSelected: React.Dispatch<React.SetStateAction<SearchResult[]>>,
) => {
	setSelectMode(!selectMode)
	if (selectMode) {
		setSelected([])
	}
}
const handleSelectImage = (
	selectedImage: SearchResult,
	selected: SearchResult[],
	setSelected: React.Dispatch<React.SetStateAction<SearchResult[]>>,
	selectMode: boolean,
	setUploaded: React.Dispatch<React.SetStateAction<boolean>>,
	setAddToAlbumDialogue: React.Dispatch<React.SetStateAction<boolean>>,
	results: any,
	isSelected: (imageId: SearchResult) => boolean,
) => {
	const imageId = selectedImage
	const idx = selected.indexOf(imageId)
	const currentlySelected = isSelected(imageId)
	if (selectMode) {
		if (currentlySelected) {
			setSelected((prev: any) =>
				prev.filter((id: SearchResult) => id !== imageId),
			)
		} else {
			setSelected((prev: any) => [...prev, imageId])
		}
		setUploaded(false)

		setAddToAlbumDialogue(false)
	} else {
		setSelected(results.resources)
		setSelected((prev: any) => {
			const clickedImageIndex = prev.findIndex(
				(id: SearchResult) => id === imageId,
			)
			const beforeClicked = prev.slice(0, clickedImageIndex)
			const afterClicked = prev.slice(clickedImageIndex + 1)
			return [imageId, ...afterClicked, ...beforeClicked]
		})
	}
}

const handleSelectAll = (
	selected: any[],
	results: any,
	setSelected: React.Dispatch<React.SetStateAction<SearchResult[]>>,
) => {
	const currentlyAllSelected = isAllSelected(selected, results.resources)
	if (currentlyAllSelected) {
		setSelected([])
	} else {
		setSelected(results.resources)
	}
}

const isAllSelected = (selected: any[], imageIds: SearchResult[]) => {
	for (const selectedImgs of selected) {
		for (const images of imageIds) {
			if (images === selectedImgs) {
				return true
			}
		}
	}
	return false
}

const handleDelete = (selected: SearchResult[], router: any) => {
	toast.info('Deleting...')	
	for (const selectedImage of selected) {
		deleteImage(selectedImage)
	}
	router.refresh()
	toast.success('Deleted successfully')
}

const colors = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']

const generateRandomColorClass = () => {
	const randomIndex = Math.floor(Math.random() * colors.length)
	return `ring-${colors[randomIndex]}-400`
}

const columns = (results: any, colIdx: number) => {
	return results.resources.filter((resource: any, resourceIdx: number) => {
		return resourceIdx % 4 === colIdx
	})
}

export {
	handleSelectMode,
	handleSelectAll,
	handleSelectImage,
	isAllSelected,
	generateRandomColorClass,
	columns,
	handleDelete,
}
