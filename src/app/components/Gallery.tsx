"use client";

import React, { useState } from "react";
import { SearchResult } from "../page";
import { motion } from "framer-motion";
import CloudImg from "./CloudImg";
import AddToAlbum from "./AddToAlbum";
import UploadAlert from "./UploadAlert";
import SlideShow from "./SlideShow";
import { deleteImage } from "./actions";
import { useSession, signOut } from "next-auth/react";
import SignInOutButton from "./SignInOutButton";
import Title from "./Title";
import Image from "next/image";
import Buttons from "./Buttons";

function Gallery({ results }: { results: { resources: SearchResult[] } }) {
  const { data: session, status } = useSession();

  const [selected, setSelected] = useState<SearchResult[]>([]);
  const [addToAlbumDialogue, setAddToAlbumDialogue] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [discoveryModeOn, setDiscoveryModeOn] = useState<boolean>(false);
  const [slideShow, setSlideShow] = useState<boolean>(false);
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const columns = (colIdx: number) => {
    return results.resources.filter((resource, idx) => {
      return idx % 5 === colIdx;
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

  const handleDiscoveryMode = () => {
    setDiscoveryModeOn(!discoveryModeOn);
    
  };

  const handleSelectMode = () => {
    setSelectMode(!selectMode);
    if(selectMode) {
      setSelected([])
    }
  };

  const container = {
    whileInView: {
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.5,
      },
    },
  };
  if (status === "loading") {
    return (
      <>
        <p> Loading...</p>
      </>
    );
  }
  if (!session) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <SignInOutButton />

        <Title />

        <motion.div
          variants={container}
          initial="initial"
          whileInView="whileInView"
          className="absolute w-screen h-screen"
        >
          <motion.div className="absolute top-14 left-40" variants={item}>
            <Image
              className="flex rounded-xl"
              height={400}
              width={400}
              src="/1.jpeg"
              alt="home-page-images"
            />
          </motion.div>
          <motion.div className="absolute top-5 left-[55%]" variants={item}>
            <Image
              className="flex rounded-xl"
              height={170}
              width={170}
              src="/2.jpeg"
              alt="home-page-images"
            />
          </motion.div>
          <motion.div className="absolute -bottom-20 left-10" variants={item}>
            <Image
              className="flex rounded-xl"
              height={400}
              width={400}
              src="/3.jpeg"
              alt="home-page-images"
            />
          </motion.div>
          <motion.div className="absolute bottom-20 right-20" variants={item}>
            <Image
              className="flex rounded-xl"
              height={370}
              width={370}
              src="/4.jpeg"
              alt="home-page-images"
            />
          </motion.div>
          <motion.div className="absolute left-[35%] bottom-20" variants={item}>
            <Image
              className="flex rounded-xl"
              height={170}
              width={170}
              src="/5.jpeg"
              alt="home-page-images"
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="">
      <button onClick={() => signOut()}>Sign Out</button>
      
      <Buttons
        selected={selected}
        images={results.resources}
        handleSelectAll={handleSelectAll}
        handleAddToAlbum={handleAddToAlbum}
        setSlideShow={setSlideShow}
        handleDelete={handleDelete}
        results={undefined}
        handleDiscoveryMode={handleDiscoveryMode}
        discoveryModeOn={discoveryModeOn}
        handleSelectMode={handleSelectMode}
        selectMode={selectMode}
      />
      {/* <SelectAllButton
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
      ) : null} */}

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
          selectedImages={selected}
        />
      ) : null}
      <motion.div className="grid grid-cols-5 gap-4 p-4">
        {[columns(0), columns(1), columns(2), columns(3), columns(4)].map(
          (col, idx) => (
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
                      ? "hover:cursor-pointer ring-[8px] ring-gray-800  scale-95 ease-in-out duration-500"
                      : "hover:cursor-pointer  ease-in-out duration-500"
                  }
                >
                 {selectMode ? (
                  <CloudImg
                    key={result.public_id}
                    discoveryModeOn={discoveryModeOn}
                    imageData={result}
                    alt="image"
                    width="960"
                    height="300"
                    onClick={() => handleSelectImage(result)}
                  />
                 ): (
                  <CloudImg
                  key={result.public_id}
                  discoveryModeOn={discoveryModeOn}
                  imageData={result}
                  alt="image"
                  width="960"
                  height="300"
                  onClick={() => {handleSelectImage(result); setSlideShow(true)}}
                />
                 )}
                  
                </motion.div>
              ))}
            </motion.div>
          )
        )}
      </motion.div>
    </section>
  );
}

export default Gallery;
