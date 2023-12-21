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
    <div className="absolute right-44 top-[40px] z-40">
      <button
        onClick={handleSelectAll}
        type="button"
        className="rounded-xl flex group-hover gap-3 p-4 bg-gray-800 text-white hover:bg-[#dddbcb] hover:text-gray-800 shadow-sm "
      >
        {selected.length > 0 ? <span>Unselect</span> : <span>Select all</span>}
      </button>
    </div>
  );
}
