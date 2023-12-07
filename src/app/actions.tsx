'use server'

import cloudinary from 'cloudinary'

export default async function tagFavourite(isFavourited: boolean, publicId: string) {
    if (isFavourited) {
       await cloudinary.v2.uploader.add_tag('favourite', [publicId])
    } else {
        await cloudinary.v2.uploader.remove_tag('favourite', [publicId])
    }
}


