import { CldImage, CldImageProps } from "next-cloudinary";
import React, { useEffect, useState } from "react";
import { SearchResult } from "../page";
import Heart from "./Heart";
import DropDown from "./DropDown";
import { AnimatePresence, motion } from "framer-motion";
import AlbumTags from "./AlbumTags";

function CloudImg({
  imageData,
  discoveryModeOn,
  ...props
}: { imageData: SearchResult; discoveryModeOn: boolean } & Omit<
  CldImageProps,
  "src"
>) {
  const [hover, setHover] = useState<boolean>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [key, setKey] = useState(Math.random());

useEffect(() => {
  if (discoveryModeOn) {
    setKey(Math.random()); // Change the key when discoveryModeOn is set to true
  }
}, [discoveryModeOn]);
  const handleLoad = () => {
    setLoaded(true);
  };
  const tags = imageData.tags.filter((tag) => tag !== "favourite");
  
  return (
    <>
      <AnimatePresence mode="wait">
       
          {discoveryModeOn ? (
            <motion.div
              key={key}
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="flex relative z-40"
              initial={{ opacity: 0 }}
              animate={hover && loaded && { opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              
            >
              <CldImage
              className="rounded-[7px] transition-transform ease-in-out duration-500"
                onLoad={handleLoad}
                src={imageData?.public_id}
                {...props}
              />

              {hover ? (
                <motion.div className="flex">
                  <Heart imageData={imageData} />
                  <DropDown imageData={imageData} />
                  {imageData.tags ? (
                    <AlbumTags album={imageData.public_id} name={tags} />
                  ) : null}
                </motion.div>
              ) : (
                <motion.div className="hidden">
                  <Heart imageData={imageData} />
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={key}
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              initial={{ opacity: 0 }}
              animate={loaded ? { opacity: 1 } : { opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex relative rounded-full"
            >
              <CldImage
                onLoad={handleLoad}
                src={imageData?.public_id}
                {...props}
                className=""
              />

              {hover ? (
                <motion.div className="flex">
                  <Heart imageData={imageData} />
                  <DropDown imageData={imageData} />
                  {imageData.tags ? (
                    <AlbumTags album={imageData.public_id} name={tags} />
                  ) : null}
                </motion.div>
              ) : (
                <motion.div className="hidden">
                  <Heart imageData={imageData} />
                </motion.div>
              )}
            </motion.div>
          )}

      </AnimatePresence>
    </>
  );
}

export default CloudImg;
