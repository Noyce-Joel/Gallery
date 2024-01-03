import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import AddToAlbum from "./AddToAlbum";
import { SearchResult } from "../page";
import { useRouter } from "next/navigation";

export default function AlbumButton({handleDelete}:{handleDelete: () => void}) {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => handleDelete()}
        type="button"
        className="rounded-xl flex group-hover gap-3 p-2 px-3 text-md hover:bg-green-200 hover:text-gray-800 bg-red-400 text-white"
      >
        Delete
      </button>
    </>
  );
}
