import React from 'react'
import { signIn } from 'next-auth/react'

export default function SignInOutButton() {
  return (
    <div className="absolute right-10 top-10 z-40">
    <button
      onClick={() => signIn()}
      type="button"
      className="rounded-xl flex group-hover gap-3 p-2 px-3 text-md bg-gray-800 hover:text-gray-800 text-white hover:bg-[#dddbcb] shadow-sm"
    >
     Sign In
    </button>
  </div>
  )
}
