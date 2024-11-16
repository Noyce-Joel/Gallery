'use client'

import React, { useState } from 'react'

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

export default function DiscoveryModeButton({
	handleDiscoveryMode,
}: {
	handleDiscoveryMode: () => void
}) {
	const [discovery, setDiscovery] = useState<boolean>(false)
	return (
		<>
			<button
				onClick={() => {
					handleDiscoveryMode()
					setDiscovery(!discovery)
				}}
				type="button"
				className={classNames(
					discovery
						? 'bg-green-400 text-gray-800 hover:bg-green-800 hover:text-white'
						: 'bg-gray-800 text-white hover:bg-[#dddbcb] hover:text-gray-800',
					'group-hover flex flex-nowrap gap-3 whitespace-nowrap rounded-xl p-2 px-3 text-sm shadow-sm',
				)}>
				Discovery
			</button>
		</>
	)
}
