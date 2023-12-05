import React, { ComponentProps, useState, useTransition } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconE } from "@heroicons/react/24/outline";
import tagFavourite from "../actions";
import { SearchResult } from "../page";
import { useRouter } from "next/navigation";

const FullHeart = (props: ComponentProps<"div">) => {
  return (
    <div {...props}>
      <HeartIcon className="h-8 w-8 flex absolute right-3 top-2 text-orange-500 hover:scale-125 ease-in-out duration-200" />
    </div>
  );
};

const EmptyHeart = (props: ComponentProps<"div">) => {
  return (
    <div {...props}>
      <HeartIconE className="h-8 w-8 absolute right-3 top-2 text-orange-500 hover:scale-125 ease-in-out transition-transform duration-200" />
    </div>
  );
};

export default function Heart({imageData}: {imageData: SearchResult}) {
  const [favourite, setFavourite] = useState(
    imageData.tags.includes('favourite')
  );
    const [transition, startTransition] = useTransition();
    const router = useRouter()
  return (
    <>
      {favourite ? (
        <FullHeart
          onClick={() => {
            setFavourite(false);
            startTransition(() => {
                tagFavourite(false, imageData.public_id);
                
            })
            
          }}
        />
      ) : (
        <EmptyHeart
          onClick={() => {
            setFavourite(true);
            startTransition(() => {
                tagFavourite(true, imageData.public_id);
               
            })
            
          }}
        />
      )}
    </>
  );
}
