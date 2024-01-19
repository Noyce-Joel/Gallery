import React from "react";
import { motion } from "framer-motion";

function Title({
  title,
  fontSize,
  delay,
}: {
  title: string[];
  fontSize: string;
  delay: number;
}) {
  const banner = {
    whileInView: {
      transition: {
        delayChildren: delay,
        staggerChildren: 0.05,
      },
    },
  };

  const letterAni = {
    initial: { y: 50 },
    whileInView: {
      y: 0,
      transition: {
        type: "spring",

        duration: 1,
      },
    },
  };
  return (
    <motion.div
      variants={banner}
      initial="initial"
      whileInView="whileInView"
      className=""
    >
      <motion.div className={`flex h-12 gap-2 ${fontSize} overflow-y-hidden`}>
        {[...title].map((letter, index) => (
          <motion.span key={index} variants={letterAni}>
            <p>{letter}</p>
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Title;
