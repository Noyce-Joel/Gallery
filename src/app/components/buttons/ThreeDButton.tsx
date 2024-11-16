import React from 'react'

export default function ThreeDButton({ handleNavigateToProjects }: any) {
	return (
		<button
			onClick={handleNavigateToProjects}
			className={`group-hover z-50 flex flex-nowrap gap-3 whitespace-nowrap rounded-xl bg-gray-800 p-2 px-3 text-sm text-white shadow-sm hover:bg-[#dddbcb] hover:text-gray-800`}>
			3D
		</button>
	)
}
