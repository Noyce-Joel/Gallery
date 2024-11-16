'use client'

import { useContext, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import '@heroicons/react/24/outline'
import { CircleStackIcon, HeartIcon, HomeIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'

import { SearchResult } from '@/app/lib/types'

import { ThemeContext, ThemeContextProps } from '@/app/context/Context'

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

export const removeHyphens = (name: string) => {
	if (name.includes('-')) {
		return name.replace(/-/g, ' ')
	} else return name
}

export default function Nav({
	rootFolders,
	usage,
}: {
	rootFolders: any
	usage: any
}) {
	const [openSignOut, setOpenSignOut] = useState<boolean>(false)
	const { theme } = useContext(ThemeContext) as ThemeContextProps
	console.log(theme)
	const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800'
	const drkMode = theme === 'dark' ? 'bg-gray-800 ' : 'bg-[#dddbcb] '
	const drkNav =
		theme === 'dark' ? 'bg-[#dddbcb] text-gray-800 ' : 'bg-gray-800 text-white'
	const drkBorder = theme === 'dark' ? 'border-white' : 'border-gray-800'
	const drkHover =
		theme === 'dark'
			? 'hover:bg-[#dddbcb] hover:text-gray-800'
			: 'hover:bg-gray-800 hover:text-white'
	const pathname = usePathname()
	const navigation = [
		{
			name: 'My Photos',
			href: '/',
			icon: HomeIcon,
			current: pathname === '/' ? true : false,
		},
		{
			name: 'Favourites',
			href: '/favourites',
			icon: HeartIcon,
			current: pathname === '/favourites' ? true : false,
		},
	]

	const tags = rootFolders.resources.flatMap(
		(resource: SearchResult) => resource.tags,
	) as string[]
	const albums = Array.from(new Set(tags)).filter((tag) => tag !== 'favourite')

	function calculateUsagePercentage(
		creditsUsed: number,
		creditsLimit: number,
	): number {
		return (creditsUsed / creditsLimit) * 100
	}
	const usagePercentage = Math.floor(
		calculateUsagePercentage(usage.credits.usage, usage.credits.limit),
	)

	return (
		<div
			className={`color-black flex flex-col gap-y-5 ${textColor} ${drkMode} z-40 w-[225px] pr-6 transition duration-[0.8s] ease-in-out`}>
			<div className={`flex h-16 shrink-0 gap-2 p-6`}>
				<h1
					className={`flex whitespace-nowrap font-bold tracking-wider ${textColor}`}>
					Noyce Photos
				</h1>
			</div>
			<nav className="flex flex-1 flex-col">
				<ul role="list" className="flex flex-1 flex-col gap-y-7">
					<li>
						<ul role="list" className="-mx-2 space-y-1">
							{navigation.map((item) => (
								<li key={item.name}>
									<a
										href={item.href}
										className={classNames(
											item.current ? `${drkNav}` : `${textColor}`,
											`${drkHover} group flex gap-x-7 rounded-r-[100px] p-2 pl-7 text-sm font-semibold leading-6`,
										)}>
										<item.icon
											className="h-6 w-6 shrink-0"
											aria-hidden="true"
										/>
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</li>
					<li className="flex h-auto grow flex-col overflow-y-auto">
						<div
							className={`text-xs font-semibold leading-6 ${textColor} flex gap-x-3 pl-9`}>
							Albums
						</div>
						<ul role="list" className="-mx-2 mt-2 space-y-1">
							{albums.map((album, idx) => (
								<li key={idx}>
									<Link
										href={`/albums/${album}`}
										className={classNames(
											pathname === `/albums/${album}`
												? `${textColor} rounded-r-[100px]`
												: '',
											'group flex gap-x-7 rounded-md p-2 pl-7 text-sm font-semibold leading-6',
										)}>
										<span
											className={classNames(
												pathname === `/albums/${album}`
													? `${drkNav} `
													: 'border border-white bg-gray-800 text-white group-hover:animate-bounce group-hover:bg-[#dddbcb] group-hover:text-gray-800',
												'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-800 text-[0.625rem] font-medium',
											)}>
											{album.charAt(0).toUpperCase()}
										</span>
										<span
											className={classNames(
												pathname === `/albums/${album}` ? `${textColor}` : '',
												`${textColor} truncate`,
											)}>
											{removeHyphens(album)}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</li>
					<li className="-mx-2 mt-auto space-y-7">
						<div className="flex flex-col gap-x-7 gap-y-5 rounded-md p-3 pb-9 pl-7 text-sm font-semibold leading-6">
							<div className="flex gap-7">
								<CircleStackIcon className="h-6 w-6" />
								<p>Credits</p>
							</div>
							<div className="flex flex-col gap-y-3">
								<div className="relative w-full">
									<div
										className={`absolute border ${drkBorder} h-[4px] w-full rounded-xl`}
									/>
									<div
										className={`absolute ${drkNav} h-[4px] w-auto rounded-xl`}
										style={{ width: `${usagePercentage}%` }}
									/>
								</div>
								<div className="flex items-start justify-start">
									{usage.credits.usage} / {usage.credits.limit} used
								</div>
							</div>
						</div>
					</li>
				</ul>
			</nav>
		</div>
	)
}
