import React, { ComponentProps, useState, useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { HeartIcon as HeartIconE } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/solid'

import { tagFavourite } from '@/app/lib/utils/actions'

import { SearchResult } from '@/lib/types'

const FullHeart = (props: ComponentProps<'div'>) => {
	return (
		<div {...props}>
			<HeartIcon className="absolute right-1 top-[5px] flex h-8 w-8 text-[#f1abb9] duration-200 ease-in-out hover:scale-125" />
		</div>
	)
}

const EmptyHeart = (props: ComponentProps<'div'>) => {
	return (
		<div {...props}>
			<HeartIconE className="absolute right-1 top-[5px] h-8 w-8 text-[#f1abb9] transition-transform duration-200 ease-in-out hover:scale-125" />
		</div>
	)
}

export default function Heart({ imageData }: { imageData: SearchResult }) {
	const [favourite, setFavourite] = useState(
		imageData.tags.includes('favourite'),
	)
	const [transition, startTransition] = useTransition()
	const router = useRouter()
	return (
		<div className="relative">
			{favourite ? (
				<FullHeart
					onClick={() => {
						setFavourite(false)
						startTransition(() => {
							tagFavourite(false, imageData.public_id)
						})
					}}
				/>
			) : (
				<EmptyHeart
					onClick={() => {
						setFavourite(true)
						startTransition(() => {
							tagFavourite(true, imageData.public_id)
						})
					}}
				/>
			)}
		</div>
	)
}
