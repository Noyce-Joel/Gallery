"use client";

import React, { useState } from "react";
import { SearchResult } from "../page";
import { motion } from "framer-motion";
import CloudImg from "./CloudImg";
import AlbumButton from "./Albumbutton";
import { Album } from "../layout";
import AddToAlbum from "./AddToAlbum";
import UploadAlert from "./UploadAlert";
import SlideShow from "./SlideShow";
import SlideShowButton from "./SlideShowButton";
import SelectAllButton from "./SelectAllButton";
import DeleteButton from "./DeleteButton";
import { deleteImage } from "./actions";

function Gallery({
  results,
  rootFolders,
}: {
  results: { resources: SearchResult[] };
  rootFolders: Album[];
}) {
  const [selected, setSelected] = useState<SearchResult[]>([]);
  const [addToAlbumDialogue, setAddToAlbumDialogue] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);

  const [slideShow, setSlideShow] = useState<boolean>(false);

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
        if (images === selectedImgs) {
          return true;
        }
      }
    }
    return false;
  };

  const handleSelectAll = () => {
    const currentlyAllSelected = isAllSelected(results.resources);
    if (currentlyAllSelected) {
      setSelected([]);
    } else {
      setSelected(results.resources);
    }
  };

  const handleDelete = () => {
    for (const selectedImage of selected) {
      deleteImage(selectedImage);
    }
  };

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
      <SelectAllButton
        selected={selected}
        images={results.resources}
        handleSelectAll={handleSelectAll}
      />
      {selected.length > 0 ? (
        <>
          <AlbumButton handleAddToAlbum={handleAddToAlbum} />
          <SlideShowButton setSlideShow={setSlideShow} />
          <DeleteButton handleDelete={handleDelete} />
        </>
      ) : null}

      {addToAlbumDialogue ? (
        <AddToAlbum
          setUploaded={setUploaded}
          setSelected={setSelected}
          setAddToAlbumDialogue={setAddToAlbumDialogue}
          imageData={selected}
          rootFolders={results}
        />
      ) : null}
      {uploaded ? (
        <UploadAlert alertType="added to album" setUploaded={setUploaded} />
      ) : null}
      {slideShow ? (
        <SlideShow
          setSlideShow={setSlideShow}
          setSelected={setSelected}
          rootFolders={rootFolders}
          selectedImages={selected}
        />
      ) : null}
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
                  isSelected(result)
                    ? "hover:cursor-pointer ring-[8px] ring-gray-800  scale-95 ease-in-out duration-200"
                    : "hover:cursor-pointer  ease-in-out duration-200"
                }
              >
                <CloudImg
                  key={result.public_id}
                  imageData={result}
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
