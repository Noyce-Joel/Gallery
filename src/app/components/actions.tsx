"use server";

import cloudinary from "cloudinary";
import { SearchResult } from "../page";

export async function createAlbum(album: string, images: SearchResult[]) {
  const newAlbum = await cloudinary.v2.api.create_folder(album);
  for (const image of images) {
    await cloudinary.v2.uploader.rename(
      image.public_id,
      `${album}/${image.public_id}`
    );
  }
  
}
  
export async function addToAlbum(album: string, images: SearchResult[]) {
  for (const image of images) {
    
    await cloudinary.v2.uploader.rename(
      image.public_id,
      `${album}/${image.public_id}`
    );
  }
  
}

export async function deleteImage(image: SearchResult) {
  await cloudinary.v2.uploader.destroy(image.public_id);
}

