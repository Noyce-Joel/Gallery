import React, { SetStateAction, useEffect, useState } from "react";
import { SearchResult } from "../page";
import CloudImg from "./CloudImg";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";



export default function SlideShow({
  selectedImages,

  setSelected,
  setSlideShow,
}: {
  selectedImages: SearchResult[];

  setSelected: React.Dispatch<SetStateAction<SearchResult[]>>;
  setSlideShow: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [index, setIndex] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [open, setOpen] = useState(true);
  const [imageUrl, setImageUrl] = useState(
    `https://res.cloudinary.com/dhkbmh13s/image/upload/q_auto:low/v1705067761/${selectedImages[0].public_id}`
  );
  const photos: any = selectedImages[index];

  useEffect(() => {
    setImageUrl(
      `https://res.cloudinary.com/dhkbmh13s/image/upload/q_auto:low/v1705067761/${selectedImages[index].public_id}`
    );

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        return handleNext();
      }
      if (e.key == "ArrowLeft") {
        return handlePrev();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [index, selectedImages]);

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

  const handleLoad = () => {
    setLoaded(true);
  };

  function getScreenHeight() {
    return window.innerHeight;
  }

  const screenHeight = getScreenHeight();
  function getImageWidth(
    imageWidth: number,
    imageHeight: number,
    screenHeight: number
  ) {
    return (imageWidth / imageHeight) * screenHeight;
  }

  const keyCard = Math.random();
  return (
    <>
      <AnimatePresence mode="wait">
        {open ? (
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              key="slide-show"
              as="div"
              className="z-40"
              onClose={() => {
                setOpen;
                setSelected([]);
                setSlideShow(false);
              }}
            >
              <div className="relative " />

              <motion.div
              id='opacity'
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed grid-1 bg-gray-800 bg-opacity-[95%] transition-opacity inset-0 z-50 h-screen w-screen"
              >
                <div className="flex max-w-full max-h-full items-end justify-center text-center sm:items-center sm:p-0">
                  <Dialog.Panel className="transform max-w-full max-h-full overflow-hidden rounded-lg text-left shadow-2xl transition-all ">
                    <motion.div
                      className="relative h-auto w-auto"
                      key={photos.public_id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <motion.div
                        key="cloud-photo"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="h-screen absolute top-0 left-0 
                        "
                      >
                        <CloudImg
                        key={keyCard}
                          discoveryModeOn={false}
                          imageData={photos}
                          alt="image"
                          width={
                            getImageWidth(
                              photos.width,
                              photos.height,
                              screenHeight
                            ) as number
                          }
                          height={
                            getImageWidth(
                              photos.height,
                              photos.height,
                              screenHeight
                            ) as number
                          }
                          className=" z-10"
                        />
                        
                      </motion.div>
                      <Image
                        key={keyCard}
                        onLoad={handleLoad}
                        src={imageUrl}
                        height={
                          getImageWidth(
                            photos.height,
                            photos.height,
                            screenHeight
                          ) as number
                        }
                        width={
                          getImageWidth(
                            photos.width,
                            photos.height,
                            screenHeight
                          ) as number
                        }
                        alt="blurred-image"
                        blurDataURL={imageUrl}
                        quality={1}

                        className=""
                      />
                    </motion.div>
                  </Dialog.Panel>
                </div>
              </motion.div>
            </Dialog>
          </Transition.Root>
        ) : null}
      </AnimatePresence>
    </>
  );
}
