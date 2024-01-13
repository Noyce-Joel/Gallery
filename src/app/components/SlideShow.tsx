import React, { SetStateAction, useEffect, useState } from "react";
import { SearchResult } from "../page";
import CloudImg from "./CloudImg";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { buildUrl } from "cloudinary-build-url";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";

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
  const [width, setWidth] = useState<number>(590);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState(
    `https://res.cloudinary.com/dhkbmh13s/image/upload/q_auto:low/v1705067761/${selectedImages[0].public_id}`
  );
  const photos: any = selectedImages[index];

  useEffect(() => {
    setImageUrl(
      `https://res.cloudinary.com/dhkbmh13s/image/upload/q_auto:low/v1705067761/${selectedImages[index].public_id}`
    );
    // selectedImages.forEach((image) => {
    //   const img = new window.Image();
    //   img.src = `https://res.cloudinary.com/dhkbmh13s/image/upload/q_auto:low/v1705067761/${image.public_id}`;
    // });
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

  return (
    <>
      <Head>
        {selectedImages.map((image) => (
          <link
            key="preload-hi-res"
            rel="preload"
            as="image"
            href={`https://res.cloudinary.com/dhkbmh13s/image/upload/v1705067761/${image.public_id}`}
          />
        ))}

        <link key={index} rel="preload" as="image" href={imageUrl} />
      </Head>
      {open ? (
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
            <div className="relative " />

            <motion.div className="fixed grid-1 bg-gray-500 bg-opacity-75 transition-opacity inset-0 z-50 w-screen">
              <div className="flex max-w-full min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                <Dialog.Panel className="transform max-w-full max-h-full overflow-hidden rounded-lg text-left shadow-xl transition-all ">
                  <AnimatePresence mode="wait">
                    <motion.div
                      className=" h-auto w-auto"
                      key={photos.public_id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CloudImg
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
                            photos.width,
                            photos.height,
                            screenHeight
                          ) as number
                        }
                      />

                      <Image
                        src={imageUrl}
                        height={
                          getImageWidth(
                            photos.width,
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
                        placeholder="blur"
                        className=" absolute inset-0 -z-20"
                      />
                    </motion.div>
                  </AnimatePresence>
                </Dialog.Panel>
              </div>
            </motion.div>
          </Dialog>
        </Transition.Root>
      ) : null}
    </>
  );
}
