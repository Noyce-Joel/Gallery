'use server'

import cloudinary from 'cloudinary'
import { getSession } from 'next-auth/react'
import { revalidatePath } from 'next/cache'
import { SearchResult } from '@/lib/types'

export async function createAlbum(album: string, images: SearchResult[]) {
	for (const image of images) {
		await cloudinary.v2.uploader.add_tag(album, [image.public_id])
	}
	 revalidatePath('/')
}

export async function addToAlbum(album: string, images: SearchResult[]) {
	for (const image of images) {
		await cloudinary.v2.uploader.add_tag(album, [image.public_id])
	}
	revalidatePath('/')
}

export async function deleteImage(image: SearchResult) {
	await cloudinary.v2.uploader.destroy(image.public_id).then((result) => {
		
	})
	revalidatePath('/')
}

export async function fetchData() {
	const results = (await cloudinary.v2.search
		.expression('resource_type:image')
		.sort_by('uploaded_at', 'desc')
		.with_field('tags')
		.max_results(100)
		.execute()) as { resources: SearchResult[] }

	const usage: any = await cloudinary.v2.api.usage().then((result) => result)
	const rootFolders = await cloudinary.v2.api.root_folders()
	return { results, usage, rootFolders }
}

export async function getUserData() {
	const user = await getSession()
	return { user }
}

export async function tagFavourite(isFavourited: boolean, publicId: string) {
	if (isFavourited) {
		await cloudinary.v2.uploader.add_tag('favourite', [publicId])
	} else {
		await cloudinary.v2.uploader.remove_tag('favourite', [publicId])
	}
	revalidatePath('/')
}
