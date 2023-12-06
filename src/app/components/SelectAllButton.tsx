import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import AddToAlbum from "./AddToAlbum";
import { SearchResult } from "../page";
import { useRouter } from "next/navigation";

export default function SelectAllButton({
  handleSelectAll,
  images,
  selected,
}: {
  handleSelectAll: () => void;
  images: SearchResult[];
  selected: SearchResult[];
}) {
  return (
    <div className="absolute right-44 top-[40px] z-20">
      <button
        onClick={handleSelectAll}
        type="button"
        className="rounded-xl flex group-hover gap-3 p-4 hover:bg-[#121723] bg-indigo-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {selected.length > 0 ? <span>Unselect</span> : <span>Select all</span>}
      </button>
    </div>
  );
}
