"use client";

import {
  HomeIcon,
  HeartIcon,
  CircleStackIcon,
} from "@heroicons/react/24/solid";
import {} from "@heroicons/react/24/outline";
import Link from "next/link";
import { SearchResult } from "../page";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { ThemeContext, ThemeContextProps } from "../context/Context";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const removeHyphens = (name: string) => {
  if (name.includes("-")) {
    return name.replace(/-/g, " ");
  } else return name;
};

export default function Nav({
  rootFolders,
  usage,
}: {
  rootFolders: any;
  usage: any;
}) {
  const { data: session, status } = useSession();
  const [openSignOut, setOpenSignOut] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext) as ThemeContextProps;
  console.log(theme);
  const textColor = theme === "dark" ? "text-white" : "text-gray-800";
  const drkMode = theme === "dark" ? "bg-gray-800 " : "bg-[#dddbcb] ";
  const drkNav =
    theme === "dark" ? "bg-[#dddbcb] text-gray-800 " : "bg-gray-800 text-white";
  const drkBorder = theme === "dark" ? "border-white" : "border-gray-800";
  const drkHover =
    theme === "dark"
      ? "hover:bg-[#dddbcb] hover:text-gray-800"
      : "hover:bg-gray-800 hover:text-white";
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
  ];

  const tags = rootFolders.resources.flatMap(
    (resource: SearchResult) => resource.tags
  ) as string[];
  const albums = Array.from(new Set(tags)).filter((tag) => tag !== "favourite");

  function calculateUsagePercentage(
    creditsUsed: number,
    creditsLimit: number
  ): number {
    return (creditsUsed / creditsLimit) * 100;
  }
  const usagePercentage = Math.floor(
    calculateUsagePercentage(usage.credits.usage, usage.credits.limit)
  );

  if (status === "loading") {
    return <></>;
  }

  session ? console.log(session.user?.name) : null;
  return (
    <div
      className={`flex flex-col gap-y-5 color-black ${textColor} ${drkMode} w-[225px] pr-6 transition duration-[0.8s] ease-in-out z-40`}
    >
      <div className={`flex h-16 shrink-0 gap-2 p-6 `}>
        <h1
          className={`flex font-bold whitespace-nowrap tracking-wider ${textColor}`}
        >
          Noyce Photos
        </h1>
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
                      item.current ? `${drkNav}` : `${textColor}`,
                      `${drkHover} group flex gap-x-7 rounded-r-[100px] p-2 pl-7 text-sm leading-6 font-semibold`
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
          <li className="flex flex-col grow overflow-y-auto h-auto">
            <div
              className={`text-xs font-semibold leading-6 ${textColor} flex gap-x-3 pl-9`}
            >
              Albums
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {albums.map((album, idx) => (
                <li key={idx}>
                  <Link
                    href={`/albums/${album}`}
                    className={classNames(
                      pathname === `/albums/${album}`
                        ? `${textColor} rounded-r-[100px]`
                        : "",
                      "group flex gap-x-7 rounded-md p-2 text-sm leading-6 font-semibold pl-7"
                    )}
                  >
                    <span
                      className={classNames(
                        pathname === `/albums/${album}`
                          ? `${drkNav} `
                          : "bg-gray-800 border border-white text-white group-hover:animate-bounce group-hover:text-gray-800 group-hover:bg-[#dddbcb]",
                        " flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-800  text-[0.625rem] font-medium  "
                      )}
                    >
                      {album.charAt(0).toUpperCase()}
                    </span>
                    <span
                      className={classNames(
                        pathname === `/albums/${album}` ? `${textColor}` : "",
                        `${textColor} truncate`
                      )}
                    >
                      {removeHyphens(album)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto -mx-2 space-y-7">
            <div className="flex flex-col gap-x-7 gap-y-5 rounded-md p-3 text-sm leading-6 font-semibold pl-7 pb-9">
              <div className="flex gap-7">
                <CircleStackIcon className="h-6 w-6" />
                <p>Credits</p>
              </div>
              <div className="flex flex-col gap-y-3">
                <div className="relative w-full">
                  <div
                    className={`absolute border ${drkBorder} w-full h-[4px] rounded-xl`}
                  />
                  <div
                    className={`absolute ${drkNav} h-[4px] rounded-xl w-auto`}
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>
                <div className="flex justify-start items-start">
                  {usage.credits.usage} / {usage.credits.limit} used
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
