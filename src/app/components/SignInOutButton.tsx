import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function SignInOutButton() {
  const { data: session } = useSession();

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.7, duration: 0.3 } },
    exit: { opacity: 0 },
  };

  if (!session) {
    return (
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="z-40"
      >
        <button
          onClick={() => signIn()}
          type="button"
          className="rounded-xl flex group-hover gap-3 p-1 px-3 text-md hover:bg-green-800 text-white bg-green-400 shadow-sm "
        >
          Sign In
        </button>
      </motion.div>
    );
  }

  return (
    <div className="">
      <button
        onClick={() => signOut()}
        type="button"
        className="rounded-xl flex group-hover gap-3 p-1 px-3 text-md bg-red-400 hover:text-white text-white hover:bg-red-800 shadow-sm"
      >
        Sign Out
      </button>
    </div>
  );
}
