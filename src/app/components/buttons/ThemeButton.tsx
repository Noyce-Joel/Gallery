import React, { useContext, useEffect, useState } from 'react'

import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

import { ThemeContext, ThemeContextProps } from '@/context/Context'

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

export default function ThemeButton() {
	const { theme, setTheme } = useContext(ThemeContext) as ThemeContextProps
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const handleMode = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	if (!mounted) {
		return null
	}

	return (
		<div className="mr-[1px]">
			<div
				className={classNames(
					theme === 'dark'
						? 'bg-[#dddbcb] text-gray-800 hover:bg-green-800'
						: 'bg-gray-800 text-white hover:bg-[#dddbcb] hover:text-gray-800',
					'group-hover group flex flex-nowrap gap-3 whitespace-nowrap rounded-xl border-[1px] border-white text-sm shadow-sm',
				)}
				onClick={handleMode}>
				<Switch
					checked={theme === 'dark'}
					onChange={handleMode}
					className={classNames(
						theme === 'dark' ? 'bg-green-400' : 'bg-gray-800',
						'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-700 ease-in-out',
					)}>
					<span className="sr-only">Use setting</span>
					<span
						className={classNames(
							theme === 'dark' ? 'translate-x-5' : 'translate-x-0',
							'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-700 ease-in-out',
						)}>
						<span
							className={classNames(
								theme === 'dark'
									? 'opacity-0 duration-100 ease-out'
									: 'opacity-100 duration-200 ease-in',
								'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
							)}
							aria-hidden="true">
							<MoonIcon className="h-3 w-3 text-gray-400" />
						</span>
						<span
							className={classNames(
								theme === 'dark'
									? 'opacity-100 duration-200 ease-in'
									: 'opacity-0 duration-100 ease-out',
								'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
							)}
							aria-hidden="true">
							<SunIcon className="h-3 w-3 text-gray-400" />
						</span>
					</span>
				</Switch>
			</div>
		</div>
	)
}
