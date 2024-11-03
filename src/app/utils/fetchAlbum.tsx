'use server'

import cloudinary from "cloudinary";

export const fetchAlbum = async (albumName: any) => {
    const results = await cloudinary.v2.search
    .expression(`resource_type:image AND tags:${albumName}`)
    .sort_by("uploaded_at", "desc")
    .with_field("tags")
    .max_results(100)
    .execute();
    return results
}

