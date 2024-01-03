import React, { useState } from "react";
import SelectAllButton from "./SelectAllButton";
import AlbumButton from "./Albumbutton";
import SlideShowButton from "./SlideShowButton";
import DeleteButton from "./DeleteButton";
import { motion, AnimatePresence } from "framer-motion";
import DiscoveryModeButton from "./DiscoveryModeButton";
import SelectModeButton from "./SelectModeButton";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Buttons({
  selected,
  results,
  handleSelectAll,
  handleAddToAlbum,
  setSlideShow,
  handleDelete,
  images,
  handleDiscoveryMode,
  discoveryModeOn,
  handleSelectMode,
  selectMode
}: {
  selected: any;
  results: any;
  handleSelectAll: any;
  handleAddToAlbum: any;
  setSlideShow: any;
  handleDelete: any;
  images: any;
  handleDiscoveryMode: any;
  discoveryModeOn: any;
  handleSelectMode: any;
  selectMode: any
}) {
  return (
    <div className="absolute top-[100px] right-10  z-40 rounded-xl">
      <div
        className={classNames(
          selectMode ? 'open' : 'closed',
          selectMode && selected.length > 0 ? 'selected' : 'open'
          
        )}
      >
        <div className="flex flex-col gap-2 justify-start items-end">
          <DiscoveryModeButton
            handleDiscoveryMode={handleDiscoveryMode}
            discoveryModeOn={discoveryModeOn}
          />
          <SelectModeButton handleSelectMode={handleSelectMode}/>
          <SelectAllButton
            selected={selected}
            images={images}
            handleSelectAll={handleSelectAll}
          />

          <SlideShowButton setSlideShow={setSlideShow} />
          <DeleteButton handleDelete={handleDelete} />
          <AlbumButton handleAddToAlbum={handleAddToAlbum} />
        </div>
      </div>
    </div>
  );
}
