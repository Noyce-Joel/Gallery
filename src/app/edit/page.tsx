"use client";

import React, { useState } from "react";
import { CldImage } from "next-cloudinary";

function Edit({
  searchParams: { publicId },
}: {
  searchParams: { publicId: string };
}) {
  const [filter, setFilter] = useState<undefined | "fill" | "crop">();
  return (
    <div className="flex relative w-screen h-screen">
      <div className="absolute left-[40px] top-[40px] flex gap-2">
        <button
          className="rounded-xl flex group-hover gap-3 p-4 hover:bg-[#121723] bg-indigo-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setFilter("fill")}
        >
          Fill Background
        </button>
        <button
          className="rounded-xl flex group-hover gap-3 p-4 hover:bg-[#121723] bg-indigo-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setFilter("crop")}
        >
          Crop
        </button>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="w-1/2 flex justify-center items-center">
          <CldImage src={publicId} height="550" width="550" alt="image-edit" />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          {filter === "fill" ? (
            <CldImage
              src={publicId}
              height="750"
              width="750"
              alt="image-edit"
              fillBackground
            />
          ) : filter === "crop" ? (
            <CldImage
              src={publicId}
              height="750"
              width="550"
              alt="image-edit"
              crop="thumb"
              gravity="center"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Edit;
