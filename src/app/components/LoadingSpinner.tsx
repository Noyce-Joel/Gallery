'use client'

import { motion } from 'framer-motion'

type LoadingProps = {
  albumName: string
  
}
function formatAlbumName(encodedName: string): string {
    return decodeURIComponent(encodedName);
  }

export default function PulsingLoading({ albumName }: LoadingProps) {
    const formattedAlbumName = formatAlbumName(albumName);
  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden dark:bg-[#1f2937] bg-[#dddbcb] light dark:dark">
        {/* <Particles /> */}
      <div className="text-center relative">
        <motion.h1
          initial={{ opacity: 0}}
          animate={{ opacity: 1 }}
          className="text-4xl font-bold dark:text-white text-gray-900 mb-8"
        >
          {formattedAlbumName}
        </motion.h1>
       
        <div className="relative w-32 h-32 mx-auto mb-12">
          <PulsingCircle delay={0} />
          <PulsingCircle delay={0.5} />
          <PulsingCircle delay={1} />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          className="text-sm dark:text-white text-gray-900 italic"
        >
          Preparing your gallery experience...
        </motion.p>
      </div>
    </div>
  )
}

function PulsingCircle({ delay }: any) {
    return (
      <div 
        className="pulsing-circle"
        style={{ animationDelay: `${delay}s` }}
      />
    )
  }

function Particles() {
    return (
      <div className="absolute inset-0 z-0 w-1/4 h-1/4 ">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute animate:pulse w-1 h-1 bg-blue-500 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random(),
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [null, Math.random()],
              scale: [null, Math.random() * 0.5 + 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    )
  }