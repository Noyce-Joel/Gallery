export type SearchResult = {
    [x: string]: any;
    height(
      width: (
        width: number,
        height: number,
        screenHeight: number
      ) => number | `${number}` | undefined,
      height: number,
      screenHeight: number
    ): number | `${number}` | undefined;
    width(
      width: number,
      height: number,
      screenHeight: number
    ): number | `${number}` | undefined;
    public_id: string;
    tags: string[];
  };