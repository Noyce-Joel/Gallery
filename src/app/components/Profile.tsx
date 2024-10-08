import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState, useTransition } from "react";
import SignInOutButton from "./SignInOutButton";
import { useSession } from "next-auth/react";
import { ThemeContext, ThemeContextProps } from "../context/Context";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export default function Profile({ session }: { session: any }) {
  const { status } = useSession();
  const [isPending, startTransition] = useTransition();
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const {theme} = useContext(ThemeContext) as ThemeContextProps;
  const textColor = theme === "dark" ? "text-gray-800" : 'text-white';  
  const drkMode = theme === "dark" ? "bg-[#dddbcb] text-gray-800 " : "bg-gray-800 text-white";
  const profilePicture = session ? session.user?.image : null;
  const container = {
    whileInView: {
      transition: {
        staggerChildren: 1,
      },
    },
  };

  const item = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    whileInView: {
      transition: {
        staggerChildren: 2,
      },
    },

    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        duration: 1,
        type: "spring",
      },
    },

    exit: {
      opacity: 0,
      scale: 0,
      x: 20,
      transition: {
        duration: 0.05,
      },
    },
  };

  const name = session?.user.name;

  const nameAni = {
    initial: { y: 200 },
    whileInView: {
      y: 0,
      transition: {
        type: "spring",
        duration: 1.7,
      },
    },
    exit: {
      y: 200,
    },
  };

  useEffect(() => {
    if (status === "authenticated") {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, []);

  const handleClick = () => {
    startTransition(() => {
      setProfileOpen(!profileOpen);
    });
  };



  return (
    <AnimatePresence>
      <div className="absolute right-4 bottom-4 ">
        <div
          className={classNames(
            profileOpen
              ? `profile-open ${drkMode}`
              : "profile-closed bg-[#dddbcb]",
            " relative rounded-3xl"
          )}
        >
          <motion.div
            key="anim-container"
            variants={container}
            animate={profileOpen ? "whileInView" : "exit"}
            className="text-white p-4 flex-nowrap gap-y-10 whitespace-nowrap"
          >
            {!signedIn ? (
              <p className={`${textColor} p-3 absolute top-0 text-md flex-nowrap gap-y-10 whitespace-nowrap`}>
                Guest
              </p>
            ) : (
              <motion.div
                key="anim-3"
                variants={container}
                animate={profileOpen ? "whileInView" : "exit"}
                className={`${textColor} p-3 absolute top-0 text-md flex-nowrap gap-y-10 whitespace-nowrap`}
              >
                {name}
              </motion.div>
            )}
            <motion.button
              className="p-2 bottom-0 absolute left-0"
              key="anim-2"
              variants={item}
            >
              <SignInOutButton />
            </motion.button>
          </motion.div>
        </div>
      </div>
      <div className="z-20">
        <div
          className="hover:cursor-pointer duration-700 ease-in-out flex flex-nowrap whitespace-nowrap  border-[#dddbcb] rounded-full  shrink-0"
          onClick={() => handleClick()}
        >
          <img
            key="profile-picture"
            src={profilePicture ? `${profilePicture}` : "/prof.jpeg"}
            alt="profile picture"
            className={classNames(
              profileOpen
                ? "h-[70px] w-[70px] scale-110 duration-700 border-4 border-gray-800 ease-in-out"
                : "h-[70px] w-[70px] duration-700 border-4 border-gray-800 ease-in-out",
              "rounded-full  shrink-0 object-cover"
            )}
          />
        </div>
      </div>
    </AnimatePresence>
  );
}
