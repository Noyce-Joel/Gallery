import React, { useContext } from "react";
import { ThemeContext, ThemeContextProps } from "../context/Context";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Loading() {
  const { theme } = useContext(ThemeContext) as ThemeContextProps;

  return (
    <>
      <div
        className={classNames(
          "loading",
          theme === "dark" ? "bg-[#dddbcb]" : "bg-gray-800"
        )}
      ></div>
      <div
        className={classNames(
          "loading",
          theme === "dark" ? "bg-[#dddbcb]" : "bg-gray-800"
        )}
      ></div>
      <div
        className={classNames(
          "loading",
          theme === "dark" ? "bg-[#dddbcb]" : "bg-gray-800"
        )}
      ></div>
    </>
  );
}
