import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import AddToAlbum from "./AddToAlbum";
import { SearchResult } from "../page";
import { useRouter } from "next/navigation";

export default function AlbumButton({handleDelete}:{handleDelete: () => void}) {
  const router = useRouter();
  return (
    <div className="absolute right-10 bottom-[40px] z-40">
      <button
        onClick={() => handleDelete()}
        type="button"
        className="rounded-xl flex group-hover gap-3 p-4 hover:bg-gray-800 hover:text-white bg-[#dddbcb] text-gray-800"
      >
        Delete
      </button>
    </div>
  );
}
