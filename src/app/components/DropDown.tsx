import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  Bars3Icon,
} from "@heroicons/react/20/solid";
import { FolderIcon } from "@heroicons/react/24/solid";
import AddToAlbum from "./AddToAlbum";
import ShareImage from "./ShareImage";
import { SearchResult } from "../page";
import { deleteImage } from "./actions";
import { ForceRefresh } from "./ForceRefresh";
import { useRouter } from "next/navigation";
import { removeHyphens } from "./Nav";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown({
  imageData,
  rootFolders,
}: {
  imageData: SearchResult;
  rootFolders: any;
}) {
  const [shareDialogue, setShareDialogue] = useState<boolean>(false);
  const router = useRouter();
  const handleDelete = () => {
    deleteImage(imageData);
    router.refresh();
  };
  
  return (
    <>
      {shareDialogue ? (
        <ShareImage imageData={imageData} />
      ) : (
        <div className=" flex h-6 w-6 absolute top-2 left-2">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-8 h-8 items-center justify-center gap-x-1.5 rounded-md bg-[#121723] p-1 text-sm font-semibold text-gray-900 shadow-sm  ">
                <div className="flex w-full h-full ">
                  <Bars3Icon className="hover:scale-125 hover:rotate-180 menu-icon text-white  duration-500 ease-in-out" />
                </div>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="">
                  
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "group flex items-center px-4 py-2 text-sm"
                        )}
                      >
                        <PencilSquareIcon
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        Edit
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => setShareDialogue(true)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "group flex items-center px-4 py-2 text-sm"
                        )}
                      >
                        <UserPlusIcon
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        Share
                      </div>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={handleDelete}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "group flex items-center px-4 py-2 text-sm"
                        )}
                      >
                        <TrashIcon
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        Delete
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
    </>
  );
}
