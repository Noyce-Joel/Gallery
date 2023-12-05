import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { Album } from "../layout";
import Link from "next/link";





export default function AlbumCard({folder}: {folder: Album}) {
    const album = folder
  return (
    
      
        <div
          key={album.name}
          className=" col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            {/* <img
              className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
              src={album.imageUrl}
              alt=""
            /> */}
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {album.name}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between"></dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="-ml-px flex w-0 flex-1">
                <div className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                  <Link href={`/albums/${folder.name}`}>View Album</Link>
                </div>
              </div>
              
            </div>
          </div>
        </div>
    
    
  );
}
