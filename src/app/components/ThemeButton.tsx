import React, { useContext, useState } from "react";
import { ThemeContext, ThemeContextProps } from "../context/Context";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export default function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext) as ThemeContextProps;

  const handleMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <div>
      <button
        type="button"
        className={classNames(
          theme === "dark"
            ? "bg-green-400 hover:bg-green-800 text-gray-800 hover:text-white"
            : "bg-gray-800 hover:bg-[#dddbcb] text-white  hover:text-gray-800",
          "rounded-xl flex-nowrap whitespace-nowrap flex group-hover gap-3 p-2 px-3 text-sm shadow-sm"
        )}
        onClick={handleMode}
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}
