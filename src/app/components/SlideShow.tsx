import React, { SetStateAction, useState } from "react";
import { SearchResult } from "../page";
import { Album } from "../layout";
import CloudImg from "./CloudImg";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
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
  const photos = selectedImages[index];
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
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => {
            setOpen;
            setSelected([]);
            setSlideShow(false)
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex max-w-full min-h-full items-end justify-center text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform max-w-full max-h-full overflow-hidden rounded-lg bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all ">
                  {open ? (
                    <CloudImg
                      key={photos.public_id}
                      imageData={photos}
                      rootFolders={rootFolders}
                      alt="image"
                      width="590"
                      height="500"
                    />
                  ) : null}
                  <button onClick={handleNext}>Next</button>
                  <button onClick={handlePrev}>Previous</button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
