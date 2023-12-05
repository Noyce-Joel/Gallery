import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import AddToAlbum from "./AddToAlbum";
import { SearchResult } from "../page";
import { useRouter } from "next/navigation";

export default function AlbumButton({handleAddToAlbum}:{handleAddToAlbum: () => void}) {
  const router = useRouter();
  return (
    <div className="absolute right-48 top-10 z-20">
      <button
        onClick={() => handleAddToAlbum()}
        type="button"
        className="rounded-xl flex group-hover gap-3 p-4 hover:bg-[#121723] bg-indigo-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add to Album
      </button>
    </div>
  );
}
