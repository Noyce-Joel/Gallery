import { useRouter } from 'next/navigation'

export default function AlbumButton({
	handleDelete,
}: {
	handleDelete: () => void
}) {
	const router = useRouter()
	return (
		<>
			<button
				onClick={() => handleDelete()}
				type="button"
				className="group-hover flex gap-3 rounded-xl bg-red-400 p-2 px-3 text-sm text-white hover:bg-green-200 hover:text-gray-800">
				Delete
			</button>
		</>
	)
}
