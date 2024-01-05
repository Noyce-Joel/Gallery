import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInOutButton() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="absolute right-10 top-10 z-40">
        <button
          onClick={() => signIn()}
          type="button"
          className="rounded-xl flex group-hover gap-3 p-2 px-3 text-md bg-gray-800 hover:text-gray-800 text-white hover:bg-green-400 shadow-sm "
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="">
      <button
        onClick={() => signOut()}
        type="button"
        className="rounded-xl flex group-hover gap-3 p-1 px-3 text-md bg-red-400 hover:text-white text-white hover:bg-red-400 shadow-sm"
      >
        Sign Out
      </button>
    </div>
  );
}
