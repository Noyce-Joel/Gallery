import Gallery from "./components/Gallery";
import { fetchData } from "./components/actions";
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
    </>
  );
}
