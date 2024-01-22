"use client";

import React, { useContext, useEffect, useState } from "react";
import { SearchResult } from "../page";
import { motion } from "framer-motion";
import CloudImg from "./CloudImg";
import AddToAlbum from "./AddToAlbum";
import SlideShow from "./SlideShow";
import { deleteImage } from "./actions";
import { useSession } from "next-auth/react";
import Buttons from "./Buttons";
import Profile from "./Profile";
import Alert from "./Alert";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import ScreenShot from "../utils/ScreenShot";
import { ThemeContext, ThemeContextProps } from "../context/Context";
function Gallery({ results }: { results: { resources: SearchResult[] } }) {
  const { data: session, status } = useSession();
  const { theme } = useContext(ThemeContext) as ThemeContextProps;

  const router = useRouter();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [selected, setSelected] = useState<SearchResult[]>([]);
  const [addToAlbumDialogue, setAddToAlbumDialogue] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [created, setCreated] = useState<boolean>(false);
  const [discoveryModeOn, setDiscoveryModeOn] = useState<boolean>(false);
  const [slideShow, setSlideShow] = useState<boolean>(false);
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const colors = ["red", "yellow", "green", "blue", "indigo", "purple", "pink"];

  const generateRandomColorClass = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return `ring-${colors[randomIndex]}-400`;
  };
let color = generateRandomColorClass();
  const drkMode =
    theme === "dark"
      ? `${color} ring-[2.5px]`
      : "ring-gray-800 ring-[5px]";

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  
  const columns = (colIdx: number) => {
    return results.resources.filter((resource, resourceIdx) => {
      return resourceIdx % 5 === colIdx;
    });
  };

  const handleSelectImage = (selectedImage: SearchResult) => {
    const imageId = selectedImage;
    const idx = selected.indexOf(imageId);
    const currentlySelected = isSelected(imageId);
    if (selectMode) {
      if (currentlySelected) {
        setSelected((prev: any) =>
          prev.filter((id: SearchResult) => id !== imageId)
        );
      } else {
        setSelected((prev: any) => [...prev, imageId]);
      }
      setUploaded(false);

      setAddToAlbumDialogue(false);
    } else {
      setSelected(results.resources);
      setSelected((prev: any) => {
        const clickedImageIndex = prev.findIndex(
          (id: SearchResult) => id === imageId
        );
        const beforeClicked = prev.slice(0, clickedImageIndex);
        const afterClicked = prev.slice(clickedImageIndex + 1);
        return [imageId, ...afterClicked, ...beforeClicked];
      });
    }
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
    router.refresh();
  };

  const handleDiscoveryMode = () => {
    setDiscoveryModeOn(!discoveryModeOn);
  };

  const handleSelectMode = () => {
    setSelectMode(!selectMode);
    if (selectMode) {
      setSelected([]);
    }
  };

  const handleLoad = () => {
    setLoaded(true);
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
      <div className="flex h-screen w-screen items-center justify-center gap-2">
        <Loading />
      </div>
    );
  }

  return (
    <section id="gallery-wrapper" className={`${theme} text-white`}>
      <div className="absolute right-12 bottom-10 z-50">
        <Profile session={session} />
      </div>

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

      {addToAlbumDialogue ? (
        <AddToAlbum
          setUploaded={setUploaded}
          setCreated={setCreated}
          setSelected={setSelected}
          setAddToAlbumDialogue={setAddToAlbumDialogue}
          imageData={selected}
          rootFolders={results}
        />
      ) : null}
      {uploaded ? <Alert alertType="added to album" /> : null}
      {created ? <Alert alertType="created album" /> : null}
      {deleted ? <Alert alertType="Successfully deleted" /> : null}

      {slideShow ? (
        <SlideShow
          setSlideShow={setSlideShow}
          setSelected={setSelected}
          selectedImages={selected}
        />
      ) : null}

      <motion.div
        id="gallery"
        onLoad={handleLoad}
        className="grid grid-cols-5 gap-2 p-4"
      >
        {[columns(0), columns(1), columns(2), columns(3), columns(4)].map(
          (col, idx) => (
            <motion.div
              variants={container}
              whileInView="whileInView"
              initial="initial"
              key={idx}
              className="flex flex-col gap-2"
            >
              {col.map((result, rIdx) => (
                <motion.div
                  key={rIdx}
                  variants={item}
                  whileInView="whileInView"
                  initial="initial"
                  className={
                    isSelected(result) && selectMode
                      ? "hover:cursor-pointer ring-[8px] ring-green-400 rounded-[5px] scale-95 ease-in-out duration-500 "
                      : discoveryModeOn
                      ? `hover:cursor-pointer rounded-[7px] transition ${drkMode} scale-95 ease-in-out duration-500 `
                      : "hover:cursor-pointer  ease-in-out duration-500"
                  }
                >
                  {selectMode && loaded ? (
                    <CloudImg
                      key="result.public_id"
                      discoveryModeOn={discoveryModeOn}
                      imageData={result}
                      alt="image"
                      width="960"
                      height="300"
                      onClick={() => handleSelectImage(result)}
                    />
                  ) : (
                    <CloudImg
                      key="result.public_id"
                      discoveryModeOn={discoveryModeOn}
                      imageData={result}
                      alt="image"
                      width="960"
                      height="300"
                      onClick={() => {
                        handleSelectImage(result);
                        setSlideShow(true);
                      }}
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
