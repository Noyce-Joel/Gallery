import { SetStateAction } from 'react'

export default function SlideShowButton({
	setSlideShow,
}: {
	setSlideShow: React.Dispatch<SetStateAction<boolean>>
}) {
	return (
		<>
			<button
				onClick={() => setSlideShow(true)}
				type="button"
				className="group-hover flex gap-3 rounded-xl bg-gray-800 p-2 px-3 text-sm text-white hover:bg-[#dddbcb] hover:text-gray-800">
				View
			</button>
		</>
	)
}
