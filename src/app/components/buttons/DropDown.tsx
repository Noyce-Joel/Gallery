import { Fragment, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Menu, Transition } from '@headlessui/react'
import {
	Bars3Icon,
	PencilSquareIcon,
	TrashIcon,
	UserPlusIcon,
} from '@heroicons/react/20/solid'

import ShareImage from '@/components/gallery/ShareImage'

import { deleteImage } from '@/app/lib/utils/actions'

import { SearchResult } from '@/lib/types'
import { toast } from 'sonner'

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

export default function DropDown({ imageData }: { imageData: SearchResult }) {
	const [shareDialogue, setShareDialogue] = useState<boolean>(false)
	const router = useRouter()
	const handleDelete = () => {
		deleteImage(imageData)
		router.refresh()
		toast.success('Deleted successfully')
	}
	const publicId = imageData.public_id
	const tags = imageData.tags

	return (
		<>
			{shareDialogue ? (
				<ShareImage imageData={imageData} />
			) : (
				<div className="absolute left-2 top-2 flex h-6 w-6 z-50">
					<Menu as="div" className="relative inline-block text-left">
						<div>
							<Menu.Button className="inline-flex h-7 w-7 items-center justify-center gap-x-1.5 rounded-md bg-[#121723] p-1 text-sm font-semibold text-gray-900 shadow-sm">
								<div className="flex h-full w-full">
									<Bars3Icon className="menu-icon text-white duration-500 ease-in-out hover:rotate-180 hover:scale-125" />
								</div>
							</Menu.Button>
						</div>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95">
							<Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-800 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div className="text-white">
									{/* <Menu.Item>
										{({ active }) => (
											<Link
												href={`/edit?publicId=${publicId}`}
												aria-disabled
												className={classNames(
													active
														? 'bg-[#dddbcb] text-gray-800 opacity-50'
														: 'text-white',
													'group flex items-center rounded-t-md px-4 py-2 text-sm',
												)}>
												<PencilSquareIcon
													className="mr-3 h-5 w-5 text-white group-hover:text-gray-800"
													aria-hidden="true"
												/>
												Edit
											</Link>
										)}
									</Menu.Item> */}
									<Menu.Item>
										{({ active }) => (
											<div
												onClick={() => setShareDialogue(true)}
												className={classNames(
													active ? 'bg-[#dddbcb] text-gray-800' : 'text-white',
													'group flex items-center px-4 py-2 text-sm',
												)}>
												<UserPlusIcon
													className="mr-3 h-5 w-5 text-white group-hover:text-gray-800"
													aria-hidden="true"
												/>
												Share
											</div>
										)}
									</Menu.Item>
								</div>
								<div className="z-0">
									<Menu.Item>
										{({ active }) => (
											<div
												onClick={() => handleDelete()}
												className={classNames(
													active ? 'bg-[#dddbcb] text-gray-800' : 'text-white',
													'group -z-10 flex items-center rounded-b-md px-4 py-2 text-sm',
												)}>
												<TrashIcon
													className="mr-3 h-5 w-5 text-white group-hover:text-gray-800"
													aria-hidden="true"
												/>
												Delete
											</div>
										)}
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			)}
		</>
	)
}
