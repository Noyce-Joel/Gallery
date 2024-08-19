import React, { SetStateAction, useEffect, useState, Fragment } from "react";
import { SearchResult } from "../page";
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
  const [open, setOpen] = useState(true);
  const [imageUrls, setImageUrls] = useState<string[][]>([]);
  const [loadedImages, setLoadedImages] = useState<boolean[][]>([]);

  const photos: any = selectedImages[index];

  useEffect(() => {
    const urls = selectedImages.map((img) => [
      getImageUrl(img.public_id, 'w_20,q_10'), // Extremely low quality
      getImageUrl(img.public_id, 'w_200,q_30'), // Low quality
      getImageUrl(img.public_id, 'q_auto:low') // High quality
    ]);
    setImageUrls(urls);
    setLoadedImages(new Array(selectedImages.length).fill([false, false, false]));
    
    // Preload the first 5 images
    urls.slice(0, 5).forEach((urlSet, idx) => {
      urlSet.forEach((url, qualityIdx) => {
        const img = new window.Image();
        img.src = url;
        img.onload = () => handleImageLoad(idx, qualityIdx);
      });
    });

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") return handleNext();
      if (e.key === "ArrowLeft") return handlePrev();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selectedImages]);

  const getImageUrl = (publicId: string, transformation: string) => 
    `https://res.cloudinary.com/dhkbmh13s/image/upload/${transformation}/v1705067761/${publicId}`;

  const handleImageLoad = (idx: number, qualityIdx: number) => {
    setLoadedImages(prev => {
      const newLoaded = [...prev];
      newLoaded[idx] = [...(newLoaded[idx] || [])];
      newLoaded[idx][qualityIdx] = true;
      return newLoaded;
    });
  };

  const handleNext = () => {
    setIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % selectedImages.length;
      preloadImage(newIndex);
      return newIndex;
    });
  };

  const handlePrev = () => {
    setIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + selectedImages.length) % selectedImages.length;
      preloadImage(newIndex);
      return newIndex;
    });
  };

  const preloadImage = (idx: number) => {
    if (!loadedImages[idx] || loadedImages[idx].some(loaded => !loaded)) {
      imageUrls[idx].forEach((url, qualityIdx) => {
        if (!loadedImages[idx][qualityIdx]) {
          const img = new window.Image();
          img.src = url;
          img.onload = () => handleImageLoad(idx, qualityIdx);
        }
      });
    }
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
                    {imageUrls[index] && imageUrls[index].map((url, qualityIdx) => (
                      <Image
                        key={`${keyCard}-${qualityIdx}`}
                        src={url}
                        height={getImageWidth(photos.height, photos.height, screenHeight) as number}
                        width={getImageWidth(photos.width, photos.height, screenHeight) as number}
                        alt={`image-quality-${qualityIdx}`}
                        className={`absolute top-0 left-0 transition-opacity duration-300 ${
                          loadedImages[index] && loadedImages[index][qualityIdx] ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(index, qualityIdx)}
                      />
                    ))}
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