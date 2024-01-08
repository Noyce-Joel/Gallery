"use client";
import { ArrowUpIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { CldUploadButton, CldUploadButtonProps } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React from "react";


export default function Upload() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    return null;
  }
  
  return (
    <>
    <CldUploadButton
      onUpload={() => {
        
        setTimeout(() => {
          router.refresh();
        }, 2500);
      }}
      uploadPreset="r2qsi3yf"
      options={{ sources: ["unsplash", "image_search", "gettyimages", "instagram", "shutterstock"] }}
    >
      <div className="rounded-xl flex group-hover gap-2 p-2 text-md bg-gray-800 text-white hover:text-gray-800 hover:bg-[#dddbcb]">
        <ArrowUpTrayIcon
          className="h-5 w-6 shrink-0 group-hover"
          aria-hidden="true"
        />
        Upload
      </div>
    </CldUploadButton>
    
    </>
  );
}
