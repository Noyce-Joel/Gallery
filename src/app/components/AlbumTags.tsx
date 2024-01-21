import { FolderIcon } from "@heroicons/react/24/outline";
import { removeHyphens } from "./Nav";
import Link from "next/link";


export default function AlbumTags({
  name,
  album,
}: {
  name: string[];
  album: string;
}) {
  return (
    <div className="absolute flex w-full overflow-y-hidden duration-100 ease-in-out bottom-0 right-0 z-20 py-2">
      <div
        
        className="flex flex-cols gap-2 px-4  overflow-x-scroll scrollbar-hide "
      >
        {name.map((tag) => (
          <Link key={tag} href={`/albums/${tag}`} type="button">
            <div className="rounded-xl text-sm justify-center hover:scale-110 cursor-pointer items-center bg-gray-800 text-white hover:bg-[#dddbcb] hover:text-gray-800 flex no-wrap whitespace-nowrap group-hover gap-1 py-1 px-2">
              <div className="flex"><FolderIcon width={14} height={14} /></div>
              <div>{removeHyphens(tag)}</div>
               
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  );
}
