import { PlusIcon } from "@heroicons/react/20/solid";
import { SetStateAction, useState } from "react";
import AddToAlbum from "./AddToAlbum";
import { SearchResult } from "../page";
import { useRouter } from "next/navigation";

export default function SlideShowButton({setSlideShow}:{setSlideShow: React.Dispatch<SetStateAction<boolean>>}) {
  
  return (
    <div className="absolute right-10 top-[160px] z-40">
      <button
        onClick={() => setSlideShow(true)}
        type="button"
        className="rounded-xl flex group-hover gap-3 p-4 hover:bg-[#121723] bg-indigo-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        View
      </button>
    </div>
  );
}
