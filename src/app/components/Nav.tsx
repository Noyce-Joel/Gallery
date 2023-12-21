"use client";

import { HomeIcon, HeartIcon } from "@heroicons/react/24/solid";
import { CalculatorIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { SearchResult } from "../page";
import { usePathname } from "next/navigation";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export const removeHyphens = (name: string) => {
  if (name.includes("-")) {
    return name.replace(/-/g, " ");
  } else return name;
};

export default function Example({
  rootFolders,
  usage,
}: {
  rootFolders: any;
  usage: any;
}) {
  const pathname = usePathname();
  const navigation = [
    {
      name: "My Photos",
      href: "/",
      icon: HomeIcon,
      current: pathname === "/" ? true : false,
    },
    {
      name: "Favourites",
      href: "/favourites",
      icon: HeartIcon,
      current: pathname === "/favourites" ? true : false,
    },
    // { name: "Editor", href: "/editor", icon: PencilSquareIcon, current: false },
  ];

  const tags = rootFolders.resources.flatMap(
    (resource: SearchResult) => resource.tags
  ) as string[];
  const albums = Array.from(new Set(tags)).filter((tag) => tag !== "favourite");
  console.log(usage)

  function calculateUsagePercentage(creditsUsed: number, creditsLimit: number): number {
    return (creditsUsed / creditsLimit) * 100;
  }
  const usagePercentage = Math.floor(calculateUsagePercentage(usage.credits.usage, usage.credits.limit));
console.log(usagePercentage)
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#dddbcb] color-black w-[225px] pr-6">
      <div className="flex h-16 shrink-0 gap-2 p-6 ">
        <span className="flex whitespace-nowrap tracking-wider text-gray-800">
          Noyce Photos
        </span>
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
                        : "text-gray-800 hover:text-white hover:bg-gray-800",
                      "group flex gap-x-7 rounded-r-[100px] p-2 pl-7 text-sm leading-6 font-semibold"
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
            <div className="text-xs font-semibold leading-6 text-gray-800 flex gap-x-3 pl-7">
              Albums
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {albums.map((album, idx) => (
                <li key={idx}>
                  <Link
                    href={`/albums/${album}`}
                    className="group flex gap-x-7 rounded-md p-2 text-sm leading-6 font-semibold pl-7"
                  >
                    <span className="group-hover:animate-bounce flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-800 bg-gray-800 text-[0.625rem] font-medium text-white group-hover:text-gray-800 group-hover:bg-[#dddbcb]">
                      {album.charAt(0).toUpperCase()}
                    </span>
                    <span className="truncate text-gray-800">
                      {removeHyphens(album)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto -mx-2 space-y-7">
            <div className="flex flex-col gap-x-7 gap-y-3 rounded-md p-2 text-sm leading-6 font-semibold pl-7">
              <span className="flex gap-7 "> <CalculatorIcon className="h-6 w-6" /> Credits Used</span>
              <span className="flex justify-center items-center"> {usage.credits.usage} / {usage.credits.limit} </span>
              <div className="relative w-full ">
              <div className="absolute border w-full border-black h-2 rounded-xl"/>
              <div className="absolute bg-gray-800 h-2 rounded-xl w-auto" style={{width: `${usagePercentage}%`}} />
              </div>
            </div>
          </li>

          <li className="mt-auto w-full flex justify-center items-center">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-800"
            >
              <img
                className="h-7 w-7 rounded-full bg-gray-800"
                src="/profile.jpeg"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true" className="hover:scale-110">
                Joel Noyce
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
