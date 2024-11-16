import { useRouter } from 'next/navigation'

export default function AlbumButton({
	handleAddToAlbum,
}: {
	handleAddToAlbum: () => void
}) {
	const router = useRouter()
	return (
		<>
			<button
				onClick={() => handleAddToAlbum()}
				type="button"
				className="group-hover flex flex-nowrap gap-3 whitespace-nowrap rounded-xl bg-gray-800 p-2 px-3 text-sm text-white shadow-sm hover:bg-[#dddbcb] hover:text-gray-800">
				Add to Album
			</button>
		</>
	)
}
