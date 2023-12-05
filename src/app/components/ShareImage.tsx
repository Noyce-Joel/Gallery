import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { SearchResult } from "../page";
import { EmailIcon, EmailShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

export default function AddToAlbum({ imageData }: { imageData: SearchResult }) {
  const [open, setOpen] = useState(true);
  const shareUrl = "http://github.com";
  const title = "Noyce Photo";
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <PlusCircleIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Share Image
                    </Dialog.Title>
                    <fieldset>
                      <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"></div>
                      <div>
                        <div className="flex justify-center items-center mt-2.5 gap-3">
                          <EmailShareButton
                            url={shareUrl}
                            subject={title}
                            body="body"
                            
                          >
                            <EmailIcon size={50} round />
                          </EmailShareButton>

                          <WhatsappShareButton
                            url={shareUrl}
                            title={title}
                            separator=":: "
                          ><WhatsappIcon size={50} round /></WhatsappShareButton>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
