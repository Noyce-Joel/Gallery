"use client"

import { SearchResult } from "@/lib/types"

export default function SelectAllButton({
	handleSelectAll,
	images,
	selected,
}: {
	handleSelectAll: () => void
	images: SearchResult[]
	selected: SearchResult[]
}) {
	return (
		<>
			<button
				onClick={handleSelectAll}
				type="button"
				className="group-hover flex gap-3 rounded-xl bg-gray-800 p-2 px-3 text-sm text-white shadow-sm hover:bg-[#dddbcb] hover:text-gray-800">
				{selected.length > 0 ? (
					<span>Unselect</span>
				) : (
					<span className="whitespace-nowrap">Select all</span>
				)}
			</button>
		</>
	)
}
