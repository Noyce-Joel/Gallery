'use client'

import { motion } from 'framer-motion'

type LoadingProps = {
	albumName: string
}
function formatAlbumName(encodedName: string): string {
	return decodeURIComponent(encodedName)
}

export default function PulsingLoading({ albumName }: LoadingProps) {
	const formattedAlbumName = formatAlbumName(albumName)
	return (
		<div className="light dark:dark flex h-screen w-full items-center justify-center overflow-hidden bg-[#dddbcb] dark:bg-[#1f2937]">
			{/* <Particles /> */}
			<div className="relative text-center">
				<motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
					{formattedAlbumName}
				</motion.h1>

				<div className="relative mx-auto mb-12 h-32 w-32">
					<PulsingCircle delay={0} />
					<PulsingCircle delay={0.5} />
					<PulsingCircle delay={1} />
				</div>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-sm italic text-gray-900 dark:text-white">
					Preparing your gallery experience...
				</motion.p>
			</div>
		</div>
	)
}

function PulsingCircle({ delay }: any) {
	return (
		<div className="pulsing-circle" style={{ animationDelay: `${delay}s` }} />
	)
}

function Particles() {
	return (
		<div className="absolute inset-0 z-0 h-1/4 w-1/4">
			{[...Array(50)].map((_, i) => (
				<motion.div
					key={i}
					className="animate:pulse absolute h-1 w-1 rounded-full bg-blue-500"
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
						repeatType: 'reverse',
					}}
				/>
			))}
		</div>
	)
}
