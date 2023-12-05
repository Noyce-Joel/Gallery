

import cloudinary from "cloudinary";
import Gallery from "./components/Gallery";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function Home() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("uploaded_at", "desc")
    .with_field('tags')
    .max_results(174)
    .execute()) as { resources: SearchResult[] };
    const rootFolders =  await cloudinary.v2.api.root_folders();
    
  return (
    <>
      <Gallery rootFolders={rootFolders} results={results} />
    </>
  );
}
