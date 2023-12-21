"use client";
import { ArrowUpIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React from "react";

export default function Upload() {
  const router = useRouter();
  return (
   
    <CldUploadButton
      onUpload={() => {
        setTimeout(() => {
          router.refresh();
        }, 2500);
      }}
      uploadPreset="r2qsi3yf"
    >
      <div className="flex group-hover gap-3 rounded-xl p-4 bg-gray-800 text-white">
        <ArrowUpTrayIcon
          className="h-6 w-6 shrink-0 group-hover"
          aria-hidden="true"
        />
        Upload
      </div>
    </CldUploadButton>

  );
}
