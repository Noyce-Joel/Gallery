import { Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import { SearchResult } from "../page";
import { addToAlbum, createAlbum } from "./actions";
import cloudinary from "cloudinary";
import { Album } from "../layout";
import { removeHyphens } from "./Nav";
import { useRouter } from "next/navigation";
import UploadAlert from "./Alert";

export default function AddToAlbum({
  rootFolders,
  imageData,
  setAddToAlbumDialogue,
  setSelected,
  setUploaded,
}: {
  rootFolders: any;
  imageData: SearchResult[];
  setAddToAlbumDialogue: React.Dispatch<SetStateAction<boolean>>;
  setSelected: React.Dispatch<SetStateAction<SearchResult[]>>;
  setUploaded: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(true);
  const [albumName, setAlbumName] = useState<string>("");

  const router = useRouter();
  const hasSpace = (path: string) => {
    if (path.includes(" ")) {
      const newAlbumName = path.replace(/ /g, "-");
      return newAlbumName;
    } else return path;
  };

  const handleAddToAlbum = async () => {
    setOpen(false);
    setTimeout(() => {
      setUploaded(true);
      setSelected([]);
      router.refresh()
    }, 2000);

    if (albumName === "") {
      const selectedAlbums = albums.filter((album) => {
        const checkedAlbum = document.getElementById(
          `album-${album}`
        ) as HTMLInputElement;
        return checkedAlbum.checked;
      });

      for (const selectedAlbum of selectedAlbums) {
        await addToAlbum(selectedAlbum, imageData);
      }
      
    } else {
      await createAlbum(hasSpace(albumName), imageData);
    }

    setAddToAlbumDialogue(false);
    setAlbumName("");
    router.refresh();
  };

  const tags = rootFolders.resources.flatMap(
    (resource: SearchResult) => resource.tags
  ) as string[];
  const albums = Array.from(new Set(tags)).filter(tag => tag !== 'favourite');

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpen;
            setAddToAlbumDialogue(false);
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
                        Select album
                      </Dialog.Title>
                      <fieldset>
                        <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                          {albums.map((album, albumIdx) => (
                            <div
                              key={albumIdx}
                              className="relative flex items-start py-4"
                            >
                              <div className="min-w-0 flex-1 text-sm leading-6">
                                <label
                                  htmlFor={`album-${album}`}
                                  className="select-none font-medium text-gray-900"
                                >
                                  {removeHyphens(album)}
                                </label>
                              </div>
                              <div className="ml-3 flex h-6 items-center">
                                <input
                                  id={`album-${album}`}
                                  name={`album-${album}`}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  value={albumName}
                                  onChange={(e) =>
                                    setAlbumName(e.currentTarget.value)
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <div className="mt-2.5">
                            <input
                              value={albumName}
                              onChange={(e) =>
                                setAlbumName(e.currentTarget.value)
                              }
                              type="text"
                              placeholder="Add to new album"
                              name="new-album"
                              id="new-album-name"
                              autoComplete="given-album-name"
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#93db94] hover:text-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleAddToAlbum}
                    >
                      {albums ? (
                        <span>Add to album</span>
                      ) : (
                        <span>Create ablum</span>
                      )}
                    </button>
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
