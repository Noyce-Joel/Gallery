import React, { useContext, useState } from "react";
import { ThemeContext, ThemeContextProps } from "../context/Context";
import { Switch } from "@headlessui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export default function ThemeButton() {
  const [enabled, setEnabled] = useState<boolean>(false);
  const { theme, setTheme } = useContext(ThemeContext) as ThemeContextProps;
  const drkMode =
    theme === "dark" ? "bg-[#dddbcb] text-gray-800 " : "bg-gray-800 text-white";
  const handleMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setEnabled(!enabled);
  };
  return (
    <div className="mr-[1px]">
      <button
        type="button"
        className={classNames(
          theme === "dark"
            ? "bg-[#dddbcb] hover:bg-green-800 text-gray-800"
            : "bg-gray-800 hover:bg-[#dddbcb] text-white  hover:text-gray-800",
          "rounded-xl group flex-nowrap whitespace-nowrap flex group-hover gap-3 text-sm border-[1px] border-white shadow-sm"
        )}
        onClick={handleMode}
      >
        {/* <div className="relative group inline-block w-12 align-middle select-none transition duration-200 ease-in-out">
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            className="toggle-checkbox hidden group"
            checked={theme === "dark"}
            onChange={handleMode}
          />
          <label
            htmlFor="toggle"
            className={`toggle-label block group overflow-hidden h-6 rounded-full ${drkMode} cursor-pointer`}
          ></label>
          <span
            className={`toggle-switch group absolute inset-y-0 ${
              theme === "dark" ? "right-0 bg-green-400 duration-400 border-2px border-black" : "left-0 duration-400 bg-green-400 ring-black ring-2px"
            } w-6 h-6 rounded-full  shadow transition-transform duration-200 ease-in-out`}
          ></span>
        </div> */}
        <Switch
          checked={theme === "dark"}
          onChange={handleMode}
          className={classNames(
            enabled ? "bg-green-400" : "bg-gray-800",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-700 ease-in-out"
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            className={classNames(
              enabled ? "translate-x-5" : "translate-x-0",
              "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-700 ease-in-out"
            )}
          >
            <span
              className={classNames(
                enabled
                  ? "opacity-0 duration-100 ease-out"
                  : "opacity-100 duration-200 ease-in",
                "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
              )}
              aria-hidden="true"
            >
             
              <MoonIcon className="h-3 w-3 text-gray-400" />
            </span>
            <span
              className={classNames(
                enabled
                  ? "opacity-100 duration-200 ease-in"
                  : "opacity-0 duration-100 ease-out",
                "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
              )}
              aria-hidden="true"
            >
             <SunIcon />
            </span>
          </span>
        </Switch>
      </button>
    </div>
  );
}
