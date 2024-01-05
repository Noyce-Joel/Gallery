import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function Title({title}: {title: string[]}) {
  
  const banner = {
    whileInView: {
      transition: {
        
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
      whileInView='whileInView'
      className=""
    >
      
        <motion.div className="flex h-12 gap-2 text-lg overflow-y-hidden">
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
