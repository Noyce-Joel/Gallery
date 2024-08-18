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
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  const [prevImageUrl, setPrevImageUrl] = useState<string>("");
  const [nextImageUrl, setNextImageUrl] = useState<string>("");

  const photos: any = selectedImages[index];

  useEffect(() => {
    const currentIndex = index;
    const prevIndex = currentIndex === 0 ? selectedImages.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === selectedImages.length - 1 ? 0 : currentIndex + 1;

    const getImageUrl = (idx: number) => 
      `https://res.cloudinary.com/dhkbmh13s/image/upload/q_auto:low/v1705067761/${selectedImages[idx].public_id}`;

    setCurrentImageUrl(getImageUrl(currentIndex));
    setPrevImageUrl(getImageUrl(prevIndex));
    setNextImageUrl(getImageUrl(nextIndex));

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        return handleNext();
      }
      if (e.key === "ArrowLeft") {
        return handlePrev();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [index, selectedImages]);

  const handleNext = () => {
    setIndex((prevIndex) => 
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setIndex((prevIndex) => 
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
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
                setOpen(false);
                setSelected([]);
                setSlideShow(false);
              }}
            >
              <div className="relative " />

              <motion.div
                id='opacity'
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed grid-1 bg-gray-800 bg-opacity-[95%] transition-opacity inset-0 z-50 h-screen w-screen`}
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
                        className="h-screen absolute top-0 left-0"
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
                          className="z-10"
                        />
                      </motion.div>
                      <Image
                        key={keyCard}
                        onLoad={handleLoad}
                        src={currentImageUrl}
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
                        alt="current-image"
                        blurDataURL={currentImageUrl}
                        quality={1}
                        className=""
                      />
                      {/* Preload previous image */}
                      <Image
                        src={prevImageUrl}
                        width={1}
                        height={1}
                        alt="preload-prev"
                        className="hidden"
                      />
                      {/* Preload next image */}
                      <Image
                        src={nextImageUrl}
                        width={1}
                        height={1}
                        alt="preload-next"
                        className="hidden"
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