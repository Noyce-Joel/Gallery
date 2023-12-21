import { CldImage, CldImageProps } from "next-cloudinary";
import React, { useState } from "react";
import { SearchResult } from "../page";
import Heart from "./Heart";
import DropDown from './DropDown'
import AlbumName from './AlbumName'



function CloudImg({
  imageData,
  
  ...props
}: { imageData: SearchResult} & Omit<CldImageProps, "src">) {
  const [hover, setHover] = useState<boolean>();
  const tags = imageData.tags.filter((tag) => tag !== "favourite");
  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex relative"
      
    >
      <CldImage src={imageData?.public_id} {...props} />

      {hover ? (
        <div className="flex">
          <Heart imageData={imageData} />
          <DropDown imageData={imageData} />
          {imageData.tags ? 
          <AlbumName album={imageData.public_id} name={tags}/>
          : null}
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
