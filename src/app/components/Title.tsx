import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function Title() {
  const title = ["N", "O", "Y", "C", "E", " ", "P", "H", "O", "T", "O", "S"];
  const banner = {
    animate: {
      transition: {
        delayChildren: 0.7,
        staggerChildren: 0.05,
      },
    },
  };

  const letterAni = {
    initial: { y: 200 },
    animate: {
      y: 0,
      transition: {
        type: "spring",

        duration: 1.7,
      },
    },
  };
  return (
    <motion.div
      variants={banner}
      initial="initial"
      animate="animate"
      className="circles-wrap"
    >
      <Link href="/">
        <motion.div className="flex h-18 gap-4 text-2xl overflow-y-hidden">
          {[...title].map((letter, index) => (
            <motion.span key={index} variants={letterAni}>
              <p>{letter}</p>
            </motion.span>
          ))}
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default Title;
