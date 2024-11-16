import React, { useContext } from 'react'

import { ThemeContext } from '@/app/context/Context'
import AlbumButton from '@/app/components/albums/Albumbutton'
import DeleteButton from '@/app/components/buttons/DeleteButton'
import DiscoveryModeButton from '@/app/components/buttons/DiscoveryModeButton'
import SelectAllButton from '@/app/components/buttons/SelectAllButton'
import SelectModeButton from '@/app/components/buttons/SelectModeButton'
import SlideShowButton from '@/app/components/buttons/SlideShowButton'
import ThemeButton from '@/app/components/buttons/ThemeButton'
import ThreeDButton from '@/app/components/buttons/ThreeDButton'

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

export default function Buttons({
	selected,
	results,
	handleSelectAll,
	handleAddToAlbum,
	setSlideShow,
	handleDelete,
	images,
	handleDiscoveryMode,
	discoveryModeOn,
	handleSelectMode,
	selectMode,
	handleNavigateToProjects,
}: {
	selected: any
	results: any
	handleSelectAll: any
	handleAddToAlbum: any
	setSlideShow: any
	handleDelete: any
	images: any
	handleDiscoveryMode: any
	discoveryModeOn: any
	handleSelectMode: any
	selectMode: any
	handleNavigateToProjects: any
}) {
	const theme = useContext(ThemeContext)

	return (
		<div className="absolute right-5 top-[25px] z-40 rounded-xl">
			<div
				className={classNames(
					selectMode ? 'open' : 'closed',
					selectMode && selected.length > 0 ? 'selected' : 'open',
				)}>
				<div className="flex flex-col items-end justify-start gap-2">
					<ThemeButton />
					<ThreeDButton handleNavigateToProjects={handleNavigateToProjects} />
					<DiscoveryModeButton handleDiscoveryMode={handleDiscoveryMode} />

					<SelectModeButton handleSelectMode={handleSelectMode} />

					<SelectAllButton
						selected={selected}
						images={images}
						handleSelectAll={handleSelectAll}
					/>

					<SlideShowButton setSlideShow={setSlideShow} />
					<DeleteButton handleDelete={handleDelete} />
					<AlbumButton handleAddToAlbum={handleAddToAlbum} />
				</div>
			</div>
		</div>
	)
}
