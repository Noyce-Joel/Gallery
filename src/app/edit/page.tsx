'use client'

import React, { useState } from 'react'

import { CldImage } from 'next-cloudinary'

function Edit({
	searchParams: { publicId },
}: {
	searchParams: { publicId: string }
}) {
	const push = null
	const [filter, setFilter] = useState<undefined | 'fill' | 'crop'>()
	return (
		<div className="relative flex h-screen w-screen">
			<div className="absolute left-[40px] top-[40px] flex gap-2">
				<button
					className="group-hover flex gap-3 rounded-xl bg-indigo-500 p-4 shadow-sm hover:bg-[#121723] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					onClick={() => setFilter('fill')}>
					Fill Background
				</button>
				<button
					className="group-hover flex gap-3 rounded-xl bg-indigo-500 p-4 shadow-sm hover:bg-[#121723] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					onClick={() => setFilter('crop')}>
					Crop
				</button>
			</div>
			<div className="flex w-full items-center justify-center">
				<div className="flex w-1/2 items-center justify-center">
					<CldImage src={publicId} height="550" width="550" alt="image-edit" />
				</div>
				<div className="flex w-1/2 items-center justify-center">
					{filter === 'fill' ? (
						<CldImage
							src={publicId}
							height="750"
							width="750"
							alt="image-edit"
							fillBackground
						/>
					) : filter === 'crop' ? (
						<CldImage
							src={publicId}
							height="750"
							width="550"
							alt="image-edit"
							crop="thumb"
							gravity="center"
						/>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default Edit
