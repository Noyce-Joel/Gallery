import cloudinary from 'cloudinary'

import Gallery from '@/components/gallery/Gallery'

import { SearchResult } from '@/lib/types'

export default async function Home() {
	const results = (await cloudinary.v2.search
		.expression('resource_type:image AND tags=favourite')
		.sort_by('uploaded_at', 'desc')
		.with_field('tags')
		.max_results(100)
		.execute()) as { resources: SearchResult[] }

	return (
		<>
			<Gallery results={results} />
		</>
	)
}
