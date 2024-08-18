import React, { SetStateAction, useEffect, useState } from "react";
import { SearchResult } from "../page";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  useEffect(() => {
    // Preload all images
    const urls = selectedImages.map((img) => getImageUrl(img.public_id));
    setImageUrls(urls);
    setLoadedImages(new Array(selectedImages.length).fill(false));
    
    // Preload the first 5 images
    urls.slice(0, 5).forEach((url, idx) => {
      const img = new window.Image();
      img.src = url;
      img.onload = () => handleImageLoad(idx);
    });

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") return handleNext();
      if (e.key === "ArrowLeft") return handlePrev();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selectedImages]);

  const getImageUrl = (publicId: string) => {
    // Use Cloudinary's transformation to deliver optimized images
    return `https://res.cloudinary.com/dhkbmh13s/image/upload/${publicId}`;
  };

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

  return (
    <AnimatePresence mode="wait">
      {open && (
        <Transition.Root show={open} as={React.Fragment}>
          <Dialog
            as="div"
            className="z-40"
            onClose={() => {
              setOpen(false);
              setSelected([]);
              setSlideShow(false);
            }}
          >
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 grid bg-gray-800 bg-opacity-95"
            >
              <div className="flex items-center justify-center">
                <Dialog.Panel className="transform overflow-hidden rounded-lg shadow-2xl transition-all">
                  <motion.div
                    key={selectedImages[index].public_id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="relative"
                  >
                    {/* Low quality placeholder */}
                    <Image
                      src={`https://res.cloudinary.com/dhkbmh13s/image/upload/q_10,w_50/${selectedImages[index].public_id}`}
                      alt="low-quality-placeholder"
                      width={600}
                      height={400}
                      className="absolute inset-0 w-full h-full object-contain blur-sm"
                    />
                    {/* High quality image */}
                    <Image
                      src={imageUrls[index]}
                      alt="high-quality-image"
                      width={1200}
                      height={800}
                      className={`transition-opacity duration-300 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => handleImageLoad(index)}
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