import React from 'react'

export default function ThreeDButton({handleNavigateToProjects}: any) {
  return (
    <button
        onClick={handleNavigateToProjects}
        className={` z-50 bg-gray-800 hover:bg-[#dddbcb] text-white  hover:text-gray-800 rounded-xl flex-nowrap whitespace-nowrap flex group-hover gap-3 p-2 px-3 text-sm shadow-sm`}
      >
        3D
      </button>
  )
}
