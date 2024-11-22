import React, { SetStateAction, useEffect, useState, Fragment } from "react";
import { SearchResult } from "../../lib/types";
import CloudImg from "./CloudImg";
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
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  const photos: any = selectedImages[index];

  useEffect(() => {
    const urls = selectedImages.map((img) => getImageUrl(img.public_id));
    setImageUrls(urls);
    setLoadedImages(new Array(selectedImages.length).fill(false));
    
    urls.slice(0, 5).forEach((url, idx) => {
      const img = new window.Image();
      img.src = url;
      img.onload = () => handleImageLoad(idx);
    });

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
  }, [selectedImages]);

  const getImageUrl = (publicId: string) => 
    `https://res.cloudinary.com/dhkbmh13s/image/upload/q_auto:low/v1705067761/${publicId}`;

  const handleImageLoad = (idx: number) => {
    setLoadedImages(prev => {
      const newLoaded = [...prev];
      newLoaded[idx] = true;
      return newLoaded;
    });
  };

  const handleNext = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1;
      // Preload the next image that isn't already loaded
      const nextToLoad = (newIndex + 2) % selectedImages.length;
      if (!loadedImages[nextToLoad]) {
        const img = new window.Image();
        img.src = imageUrls[nextToLoad];
        img.onload = () => handleImageLoad(nextToLoad);
      }
      return newIndex;
    });
  };

  const handlePrev = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1;
      // Preload the previous image that isn't already loaded
      const prevToLoad = (newIndex - 2 + selectedImages.length) % selectedImages.length;
      if (!loadedImages[prevToLoad]) {
        const img = new window.Image();
        img.src = imageUrls[prevToLoad];
        img.onload = () => handleImageLoad(prevToLoad);
      }
      return newIndex;
    });
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
    <AnimatePresence mode="wait">
      {open && (
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
            <div className="relative" />

            <motion.div
              id='opacity'
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`fixed grid-1 bg-gray-800 bg-opacity-[95%] transition-opacity inset-0 z-50 h-screen w-screen`}
            >
              <div className="flex max-w-full max-h-full items-end justify-center text-center sm:items-center sm:p-0">
                <Dialog.Panel className="transform max-w-full max-h-full overflow-hidden rounded-lg text-left shadow-2xl transition-all">
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
                        priority={true}
                        fetchPriority="high"
                      />
                    </motion.div>
                    <Image
                      key={keyCard}
                      onLoad={handleLoad}
                      src={imageUrls[index]}
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
                      blurDataURL={imageUrls[index]}
                      quality={1}
                      className=""
                      priority={true}
                      fetchPriority="high"
                    />
                    {/* Preload previous image */}
                    <Image
                      src={imageUrls[(index - 1 + selectedImages.length) % selectedImages.length]}
                      width={1}
                      height={1}
                      alt="preload-prev"
                      className="hidden"
                      priority={true}
                      fetchPriority="high"
                    />
                    {/* Preload next image */}
                    <Image
                      src={imageUrls[(index + 1) % selectedImages.length]}
                      width={1}
                      height={1}
                      alt="preload-next"
                      className="hidden"
                      priority={true}
                      fetchPriority="high"
                    />
                  </motion.div>
                </Dialog.Panel>
              </div>
            </motion.div>
          </Dialog>
        </Transition.Root>
      )}
    </AnimatePresence>
  );
}