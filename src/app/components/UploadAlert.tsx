import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

import { SetStateAction, useState } from "react";

export default function UploadAlert({setUploaded}:{setUploaded: React.Dispatch<SetStateAction<boolean>>}) {
    const [open, setOpen] = useState<boolean>(true)
    
  return (
    <>
    {open ?
    <motion.div initial={{x: 400}} animate={{x:0}} className="fixed right-10 bottom-10 w-fit z-20 rounded-md bg-green-50 p-4">
      <div className="flex gap-3">
        <div className="flex justify-evenly">
          <div className="flex-shrink-0">
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">
              Successfully added to album
            </p>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
            onClick={() => {setOpen(false); setUploaded(false)}}
              type="button"
              className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none  focus:ring-offset-2 focus:ring-offset-green-50"
            >
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </motion.div> 
    : null }
    
    </>    
  )
  
}
