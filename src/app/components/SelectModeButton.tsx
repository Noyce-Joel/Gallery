import { useState } from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectModeButton({
  handleSelectMode,
}: {
  handleSelectMode: any;
}) {
  const [selectOn, setSelectOn] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => {
          handleSelectMode();
          setSelectOn(!selectOn);
        }}
        type="button"
        className={classNames(
          selectOn
            ? "bg-green-400 hover:bg-green-800 text-gray-800 hover:text-white"
            : "bg-gray-800 hover:bg-[#dddbcb] text-white  hover:text-gray-800",
          "rounded-xl flex group-hover gap-3 p-2 px-3 text-sm   shadow-sm "
        )}
      >
        <span className="whitespace-nowrap">Select</span>
      </button>
    </>
  );
}
