import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import AddToAlbum from "./AddToAlbum";
import { SearchResult } from "../page";
import { useRouter } from "next/navigation";

export default function AlbumButton({handleAddToAlbum}:{handleAddToAlbum: () => void}) {
  const router = useRouter();
  return (
    <div className="absolute right-10 top-[100px] z-40">
      <button
        onClick={() => handleAddToAlbum()}
        type="button"
        className="rounded-xl flex group-hover gap-3 p-4 bg-gray-800 hover:text-gray-800 text-white hover:bg-[#dddbcb] shadow-sm"
      >
        Add to Album
      </button>
    </div>
  );
}
