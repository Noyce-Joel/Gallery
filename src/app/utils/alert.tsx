import { CheckCircleIcon, XMarkIcon, HandRaisedIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

import { SetStateAction, useState } from "react";

export default function Alert({ alertType }: { alertType: string; }) {
  const [open, setOpen] = useState<boolean>(true);
  let alertMessage;
  let success;
  switch (alertType) {  
    case 'added to album':
      alertMessage = 'Successfully added to album';
      success = true
      break;
    case 'exists in album':
      alertMessage = 'Belongs to another album';
      break;
    case 'Successfully uploaded':
      alertMessage = 'Sorry, only admin can upload images';
      success = false
      break;
    case 'Successfully deleted':
      alertMessage = 'Sorry, only admin can delete images';
      success = false
      break;
      case 'created album':
      
      alertMessage = 'Sorry, only admin can create an album';
      success = false
      break;
  }
  return (
    <>
      {open ? (
        <motion.div
          initial={{ y: 400}}
          animate={{ y: 0}}
          className="fixed right-[50%] left-[42%] bottom-10 w-fit z-40 rounded-md bg-green-50 p-4"
        >
          <div className="flex gap-3">
            <div className="flex justify-evenly">
              <div className="flex-shrink-0">
                {success ? (
                  <CheckCircleIcon
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
                ) : (
                  <HandRaisedIcon
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
                )}
                
              </div>
              <div className="ml-3">
                {alertType  ? (
                  <p className="text-sm font-medium text-green-800 whitespace-nowrap">
                    {alertMessage}
                  </p>
                ) : null}
                
              </div>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none  focus:ring-offset-2 focus:ring-offset-green-50"
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  );
}
