import Link from 'next/link'

import { FolderIcon } from '@heroicons/react/24/outline'

import { removeHyphens } from '../navigation/Nav'

export default function AlbumTags({
	name,
	album,
}: {
	name: string[]
	album: string
}) {
	return (
		<div className="absolute bottom-0 right-0 z-20 flex w-full overflow-y-hidden py-2 duration-100 ease-in-out">
			<div className="flex-cols scrollbar-hide flex gap-2 overflow-x-scroll px-4">
				{name.map((tag) => (
					<Link key={tag} href={`/albums/${tag}`} type="button">
						<div className="no-wrap group-hover flex cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-xl bg-gray-800 px-2 py-1 text-sm text-white hover:scale-110 hover:bg-[#dddbcb] hover:text-gray-800">
							<div className="flex">
								<FolderIcon width={14} height={14} />
							</div>
							<div>{removeHyphens(tag)}</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
