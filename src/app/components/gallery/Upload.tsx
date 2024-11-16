'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { CldUploadButton } from 'next-cloudinary'

import Alert from '@/app/lib/utils/alert'

export default function Upload() {
	const [uploaded, setUploaded] = useState<boolean>(false)
	const router = useRouter()

	return (
		<>
			<CldUploadButton
				onUpload={() => {
					// setTimeout(() => {
					//   router.refresh();
					// }, 2000);
				}}
				onClose={() => {
					setUploaded(true)
				}}
				onSuccess={() => {
					console.log('success')
				}}
				uploadPreset="r2qsi3yf"
				options={{
					sources: [
						'unsplash',
						'image_search',
						'gettyimages',
						'instagram',
						'shutterstock',
						'local',
					],
				}}>
				<div className="group-hover flex gap-2 rounded-xl bg-gray-800 p-2 text-sm text-white hover:bg-[#dddbcb] hover:text-gray-800">
					<ArrowUpTrayIcon
						className="group-hover h-4 w-4 pt-1"
						aria-hidden="true"
					/>
					Upload
				</div>
			</CldUploadButton>
			{uploaded ? <Alert alertType="Successfully uploaded" /> : null}
		</>
	)
}
