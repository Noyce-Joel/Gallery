import { useState } from 'react'

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

export default function SelectModeButton({
	handleSelectMode,
}: {
	handleSelectMode: any
}) {
	const [selectOn, setSelectOn] = useState<boolean>(false)
	return (
		<>
			<button
				onClick={() => {
					handleSelectMode()
					setSelectOn(!selectOn)
				}}
				type="button"
				className={classNames(
					selectOn
						? 'bg-green-400 text-gray-800 hover:bg-green-800 hover:text-white'
						: 'bg-gray-800 text-white hover:bg-[#dddbcb] hover:text-gray-800',
					'group-hover flex gap-3 rounded-xl p-2 px-3 text-sm shadow-sm',
				)}>
				<span className="whitespace-nowrap">Select</span>
			</button>
		</>
	)
}
