import cloudinary from 'cloudinary'

import Gallery from '@/app/components/gallery/Gallery'

export default async function AlbumPage({
	params: { albumName },
}: {
	params: {
		albumName: string
	}
}) {
	const results = await cloudinary.v2.search
		.expression(`resource_type:image AND tags:${albumName}`)
		.sort_by('uploaded_at', 'desc')
		.with_field('tags')
		(10)
		.execute()

	return (
		<>
			<Gallery results={results} />
		</>
	)
}
