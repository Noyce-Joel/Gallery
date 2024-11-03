import { Suspense } from "react";
import Gallery from "./components/gallery/Gallery";
import { fetchData } from "./utils/actions";
import Head from "next/head";

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
      <Suspense fallback={<div>Loading...</div>}>
        <Gallery results={results} />
      </Suspense>
    </>
  );
}
