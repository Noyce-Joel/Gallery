import {
  HomeIcon,
  HeartIcon,
  PencilSquareIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import Upload from "./Upload";
import { Album } from "../layout";
import Link from "next/link";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export const removeHyphens = (name: string) => {
  if(name.includes('-')) {
   return name.replace(/-/g, ' ')
  } else
  return name
}

export default function Example({ rootFolders }: { rootFolders: any }) {
  
  const navigation = [
    { name: "My Photos", href: "/", icon: HomeIcon, current: true },
    {
      name: "Favourites",
      href: "/favourites",
      icon: HeartIcon,
      current: false,
    },
    { name: "Editor", href: "/editor", icon: PencilSquareIcon, current: false },
   
  ];

  const albums: Album[] = rootFolders.folders;
  

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
      <div className="flex flex-col h-16 shrink-0 items-center mt-5">
        <span>NOYCE</span>
        <span>PHOTOS</span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400 flex gap-x-3">
              Albums
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {albums.map((album) => (
                <li key={album.name}>
                  <Link
                    href={`/albums/${album.path}`}
                    className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                      .
                    </span>
                    <span className="truncate">{removeHyphens(album.name)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
            >
              <img
                className="h-8 w-8 rounded-full bg-gray-800"
                src="/profile.jpeg"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Joel Noyce</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
