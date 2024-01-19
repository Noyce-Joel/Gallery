import Gallery from "./components/Gallery";
import { fetchData } from "./components/actions";
import Head from "next/head";
export type SearchResult = {
  height(
    width: (
      width: any,
      height: any,
      screenHeight: number
    ) => number | `${number}` | undefined,
    height: any,
    screenHeight: number
  ): number | `${number}` | undefined;
  width(
    width: any,
    height: any,
    screenHeight: number
  ): number | `${number}` | undefined;
  public_id: string;
  tags: string[];
};

export default async function Home() {
  const { results } = await fetchData();
  
  return (
    <>
    <Head>
    {results.resources.map((image) => (
      <link
        key="preload-hi-res"
        rel="preload"
        as="image"
        href={`https://res.cloudinary.com/dhkbmh13s/image/upload/v1705067761/${image.public_id}`}
      />
    ))}
  </Head>
    
      <Gallery results={results} />
      {/* <div className="absolute right-10 bottom-10">
      <NoFetch />
      </div> */}
    </>
  );
}
