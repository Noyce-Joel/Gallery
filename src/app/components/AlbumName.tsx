
import { FolderIcon } from "@heroicons/react/24/outline";
import { removeHyphens } from "./Nav";
import Link from "next/link";
export default function AlbumName({name, album}:{name: string; album: string}) {
  
  return (
    <div className="absolute hover:scale-110 duration-100 ease-in-out bottom-0 right-0 z-20 p-2">
      <Link
       href={`/albums/${album.split('/')[0]}`}
        type="button"
        className="rounded-xl justify-center items-center bg-gray-900 flex no-wrap group-hover gap-3 py-1.5 px-2"
      >
        <FolderIcon width={15} height={15} /> {removeHyphens(name.split('/')[0])}
      </Link>
    </div>
  );
}
