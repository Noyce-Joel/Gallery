

import Gallery from "@/app/components/Gallery";
import { SearchResult } from "@/app/page";
import cloudinary from "cloudinary";





export default async function AlbumPage({
    params: { albumName }
} : { params: {
    albumName: string
}}) {
  // const decodeAlbumName = (path: string) => {
  //   const newPath = `'${path}\'`
  //     return newPath
  // }
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image AND tags:${albumName}`)
    .sort_by("uploaded_at", "desc")
    .with_field('tags')
    .max_results(116)
    .execute()) ;
    const rootFolders =  await cloudinary.v2.api.root_folders();
   

  return (
    <>
    
      <Gallery rootFolders={rootFolders} results={results}  />
    
    </>
  );
}
