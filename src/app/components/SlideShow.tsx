import React, { SetStateAction, useEffect, useState } from "react";
import { SearchResult } from "../page";
import { Album } from "../layout";
import CloudImg from "./CloudImg";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { on } from "events";
export default function SlideShow({
  selectedImages,
  rootFolders,
  setSelected,
  setSlideShow,
}: {
  selectedImages: SearchResult[];
  rootFolders: Album[];
  setSelected: React.Dispatch<SetStateAction<SearchResult[]>>;
  setSlideShow: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [index, setIndex] = useState<number>(0);
  const [open, setOpen] = useState(true);

  const [width, setWidth] = useState<number>(590);

  const photos = selectedImages[index];

 

  

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      setWidth((prevValue) => prevValue + (event.deltaY > 0 ? 5 : -5));
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        return handleNext();
      }
      if (e.key == "ArrowLeft") {
        return handlePrev();
      }
    };

    window.addEventListener("wheel", handleScroll);
    document.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("wheel", handleScroll);
      document.removeEventListener("keydown", handleKey);
    };
  }, [index]);

  const btnClass =
    "rounded-xl flex justify-center text-sm items-center group-hover gap-3 p-2 hover:bg-[#121723] bg-indigo-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

  const handleNext = () => {
    if (index === selectedImages.length - 1) {
      setIndex(0);
    } else setIndex(index + 1);
  };
  const handlePrev = () => {
    if (index === 0) {
      setIndex(selectedImages.length - 1);
    } else setIndex(index - 1);
  };

  const handleSize = (size: boolean) => {
    if (size) {
      setWidth(width + 50);
    } else {
      setWidth(width - 50);
    }
  };
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="z-40"
          onClose={() => {
            setOpen;
            setSelected([]);
            setSlideShow(false);
          }}
        >
          <div className="fixed grid-1 inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <div className="fixed inset-0 z-10 w-screen ">
            <div className="flex max-w-full min-h-full items-end justify-center text-center sm:items-center sm:p-0">
              <Dialog.Panel className="transform max-w-full max-h-full overflow-hidden rounded-lg bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all ">
                {open ? (
                  <CloudImg
                    key={photos.public_id}
                    imageData={photos}
                    
                    alt="image"
                    width={width}
                    height="500"
                  />
                ) : null}
                <div className="absolute bottom-10 left-10 flex gap-3">
                  <button className={btnClass} onClick={handleNext}>
                    Next
                  </button>
                  <button className={btnClass} onClick={handlePrev}>
                    Previous
                  </button>
                  <button className={btnClass} onClick={() => handleSize(true)}>
                    <PlusIcon width={15} height={15} />
                  </button>
                  <button
                    className={btnClass}
                    onClick={() => handleSize(false)}
                  >
                    <MinusIcon width={15} height={15} />
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
