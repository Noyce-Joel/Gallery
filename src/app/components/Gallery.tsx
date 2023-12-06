"use client";

import { Html, Scroll } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";
import { SearchResult } from "../page";
import { AnimatePresence, motion } from "framer-motion";
import CloudImg from "./CloudImg";
import AlbumButton from "./Albumbutton";
import { Album } from "../layout";
import AddToAlbum, { isInAnotherAlbum } from "./AddToAlbum";
import UploadAlert from "./UploadAlert";
import SlideShow from "./SlideShow";
import SlideShowButton from "./SlideShowButton";
import SelectAllButton from "./SelectAllButton";

function Gallery({
  results,
  rootFolders,
}: {
  results: { resources: SearchResult[] };
  rootFolders: Album[];
}) {
  console.log(results.resources)
  const [selected, setSelected] = useState<SearchResult[]>([]);
  const [addToAlbumDialogue, setAddToAlbumDialogue] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [existsInAnotherAlbum, setExistsInAnotherAlbum] =
    useState<boolean>(false);
    const [slideShow, setSlideShow] = useState<boolean>(false)

  const columns = (colIdx: number) => {
    return results.resources.filter((resource, idx) => {
      return idx % 4 === colIdx;
    });
  };



  const handleSelectImage = (selectedImage: SearchResult) => {
    const imageId = selectedImage;
    const currentlySelected = isSelected(imageId);
    if (currentlySelected) {
      setSelected((prev: any) =>
        prev.filter((id: SearchResult) => id !== imageId)
      );
    } else {
      setSelected((prev: any) => [...prev, imageId]);
    }
    setUploaded(false);
    
    setAddToAlbumDialogue(false);
  };

  const handleAddToAlbum = () => {
    setAddToAlbumDialogue(true);
  };

  const isSelected = (imageId: SearchResult) => {
    for (const selectedImgs of selected) {
      if (imageId === selectedImgs) {
        return true;
      }
    }
    return false;
  };

  const isAllSelected = (imageIds: SearchResult[]) => {
    for (const selectedImgs of selected) {
      for (const images of imageIds) {
        if(images === selectedImgs) {
          return true
        }
      }
    } return false
  }
  console.log(isAllSelected(results.resources))

  const handleSelectAll = () => {
    const currentlyAllSelected = isAllSelected(results.resources)
    if (currentlyAllSelected) {
      setSelected([])
    } else { 
    setSelected(results.resources)
    }
  }

  const container = {
    whileInView: {
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const item = {
    initial: {
      opacity: 0,
    },
    whileInView: {
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };

  

  return (
    
    <section className="">
      <SelectAllButton selected={selected} images={results.resources} handleSelectAll={handleSelectAll}/>
      {selected.length > 0 ? (
        <>
        <AlbumButton handleAddToAlbum={handleAddToAlbum} />
        <SlideShowButton setSlideShow={setSlideShow} />
        </>
      ) : null}

      {addToAlbumDialogue ? (
        <AddToAlbum
          setUploaded={setUploaded}
          setExistsInAnotherAlbum={setExistsInAnotherAlbum}
          setSelected={setSelected}
          setAddToAlbumDialogue={setAddToAlbumDialogue}
          imageData={selected}
          rootFolders={rootFolders}
        />
      ) : null}
      {uploaded ? (
        <UploadAlert alertType="added to album" setUploaded={setUploaded} />
      ) : existsInAnotherAlbum ? (
        <UploadAlert alertType="exists in album" setUploaded={setUploaded} />
      ) : null}
      {slideShow ?
    <SlideShow setSlideShow={setSlideShow} setSelected={setSelected} rootFolders={rootFolders} selectedImages={selected} /> :
    null  
    }
      <motion.div className="grid grid-cols-4 gap-4 p-4">
        {[columns(0), columns(1), columns(2), columns(3)].map((col, idx) => (
          <motion.div
            variants={container}
            whileInView="whileInView"
            initial="initial"
            key={idx}
            className="flex flex-col gap-4"
          >
            {col.map((result, idx) => (
              <motion.div
                key={idx}
                variants={item}
                whileInView="whileInView"
                initial="initial"
                className={
                  isSelected(result) && existsInAnotherAlbum && isInAnotherAlbum([result])
                    ? "hover:cursor-pointer ring-8 ring-red-500 scale-95 ease-in-out duration-200"
                    : isSelected(result)
                    ? "hover:cursor-pointer ring-8 ring-violet-200 scale-95 ease-in-out duration-200"
                    : "hover:cursor-pointer ease-in-out duration-200"
                }
              >
                <CloudImg
                  key={result.public_id}
                  imageData={result}
                  rootFolders={rootFolders}
                  alt="image"
                  width="960"
                  height="300"
                  onClick={() => handleSelectImage(result)}
                />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </section>
   
  );
}

export default Gallery;
