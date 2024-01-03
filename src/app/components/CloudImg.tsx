import { CldImage, CldImageProps } from "next-cloudinary";
import React, { useState } from "react";
import { SearchResult } from "../page";
import Heart from "./Heart";
import DropDown from "./DropDown";
import AlbumName from "./AlbumName";
import { AnimatePresence, motion } from "framer-motion";

function CloudImg({
  imageData,
  discoveryModeOn,
  ...props
}: { imageData: SearchResult; discoveryModeOn: boolean } & Omit<
  CldImageProps,
  "src"
>) {
  const [hover, setHover] = useState<boolean>();
  
  const tags = imageData.tags.filter((tag) => tag !== "favourite");
  return (
    <>
      {discoveryModeOn ? (
        <AnimatePresence>
          <motion.div
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="flex relative"
            initial={{ opacity: 0 }}
            animate={hover && { opacity: 1 }}
           
            transition={{ duration: 0.25 }}
          >
            <CldImage src={imageData?.public_id} {...props} />

            {hover ? (
              <motion.div className="flex">
                <Heart imageData={imageData} />
                <DropDown imageData={imageData} />
                {imageData.tags ? (
                  <AlbumName album={imageData.public_id} name={tags} />
                ) : null}
              </motion.div>
            ) : (
              <motion.div className="hidden">
                <Heart imageData={imageData} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <motion.div
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            initial={{ opacity: 0 } }
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex relative"
          >
            <CldImage src={imageData?.public_id} {...props} />

            {hover ? (
              <motion.div className="flex">
                <Heart imageData={imageData} />
                <DropDown imageData={imageData} />
                {imageData.tags ? (
                  <AlbumName album={imageData.public_id} name={tags} />
                ) : null}
              </motion.div>
            ) : (
              <motion.div className="hidden">
                <Heart imageData={imageData} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}

export default CloudImg;
