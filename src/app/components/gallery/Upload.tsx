"use client";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Alert from "../../utils/alert";

export default function Upload() {
  const [uploaded, setUploaded] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <CldUploadButton
        onUpload={() => {
          // setTimeout(() => {
          //   router.refresh();
          // }, 2000);
        }}
        onClose={() => {
          setUploaded(true);
        }}
        onSuccess={() => {
          console.log("success");
        }}
        uploadPreset="r2qsi3yf"
        options={{
          sources: [
            "unsplash",
            "image_search",
            "gettyimages",
            "instagram",
            "shutterstock",
            "local",
          ],
        }}
      >
        <div className="rounded-xl flex group-hover gap-2 p-2 text-sm bg-gray-800 text-white hover:text-gray-800 hover:bg-[#dddbcb]">
          <ArrowUpTrayIcon
            className="h-4 w-4 pt-1 group-hover"
            aria-hidden="true"
          />
          Upload
        </div>
      </CldUploadButton>
      {uploaded ? <Alert alertType="Successfully uploaded" /> : null}
    </>
  );
}
