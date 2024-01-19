import { FolderIcon } from "@heroicons/react/24/outline";
import { removeHyphens } from "./Nav";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AlbumTags({
  name,
  album,
}: {
  name: string[];
  album: string;
}) {
  return (
    <div className="absolute flex w-full overflow-y-hidden duration-100 ease-in-out bottom-0 right-0 z-20 p-2">
      <div
        
        className="flex flex-cols gap-2 px-4  overflow-x-scroll scrollbar-hide"
      >
        {name.map((tag) => (
          <Link key={tag} href={`/albums/${tag}`} type="button">
            <div className="rounded-xl text-sm justify-center hover:scale-110 cursor-pointer items-center bg-gray-800 text-white hover:bg-[#dddbcb] hover:text-gray-800 flex no-wrap whitespace-nowrap group-hover gap-3 py-1 px-2">
              <FolderIcon width={15} height={15} /> {removeHyphens(tag)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
