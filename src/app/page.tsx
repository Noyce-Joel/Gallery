import { useSession } from "next-auth/react";
import Gallery from "./components/Gallery";
import Profile from "./components/Profile";
import { fetchData } from "./components/actions";
import NoFetch from "./components/NoFetch";
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
      <Gallery results={results} />
      {/* <div className="absolute right-10 bottom-10">
      <NoFetch />
      </div> */}
    </>
  );
}
