"use client";

import { set } from "mongoose";
import React, { useState } from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function DiscoveryModeButton({
  handleDiscoveryMode,
  discoveryModeOn,
}: {
  handleDiscoveryMode: () => void;
  discoveryModeOn: boolean;
}) {
  const [discovery, setDiscovery] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => {
          handleDiscoveryMode();
          setDiscovery(!discovery);
        }}
        type="button"
        className={classNames(
          discovery ? 'bg-green-400 hover:bg-green-800 text-gray-800 hover:text-white' : 'bg-gray-800 hover:bg-[#dddbcb] text-white  hover:text-gray-800',
          "rounded-xl flex-nowrap whitespace-nowrap flex group-hover gap-3 p-2 px-3 text-md shadow-sm"
        )}
      >
        Discovery
      </button>
    </>
  );
}
