import { CldImage, CldImageProps } from "next-cloudinary";
import React, { useState } from "react";
import { SearchResult } from "../page";
import Heart from "./Heart";
import DropDown from './DropDown'
function CloudImg({
  imageData,
  rootFolders,
  ...props
}: { imageData: SearchResult; rootFolders: any} & Omit<CldImageProps, "src">) {
  const [hover, setHover] = useState<boolean>();
  
  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex relative"
      
    >
      <CldImage src={imageData.public_id} {...props} />

      {hover ? (
        <div className="flex">
          <Heart imageData={imageData} />
          <DropDown rootFolders={rootFolders} imageData={imageData} />
        </div>
      ) : (
        <div className="hidden">
          <Heart imageData={imageData} />
        </div>
      )}
    </div>
  );
}

export default CloudImg;
