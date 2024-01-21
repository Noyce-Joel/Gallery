import React, { Fragment, useState } from "react";
import html2canvas from "html2canvas";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

export default function ScreenShot() {
  const [imgData, setImgData] = useState<string>('');
  const [open, setOpen] = useState(true);
  const captureScreenshot = () => {
    const galleryEl = document.getElementById("gallery-wrapper");
    setOpen(true)
    if (galleryEl) {
      html2canvas(galleryEl, { useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        setImgData(imgData);
      });
    }
  };

  const downloadImage = () => {
    if (imgData) {
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'screenshot.png';
      link.click();
    }
  };

  return (
    <>
    <button onClick={captureScreenshot}>Create collage</button>
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative w-full h-full z-10"
        onClose={() => {
          setOpen(!open)
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed justify-center items-center inset-0 z-10 w-full h-full overflow-y-auto">
          <div className="flex h-screen w-screen items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="m-10 w-screen h-screen transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all ">
               
                <div className="w-screen h-screen p-4 ">
                
              <img src={`${imgData}`} alt='collage' className='h-screen w-screen' />
                  </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  );
}