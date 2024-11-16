import React, { useContext } from 'react'

import { motion } from 'framer-motion'
import { signIn, signOut, useSession } from 'next-auth/react'

import { ThemeContext, ThemeContextProps } from '@/app/context/Context'

export default function SignInOutButton() {
	const { data: session } = useSession()
	const { theme } = useContext(ThemeContext) as ThemeContextProps
	const textColor =
		theme === 'dark' ? 'text-gray-800 hover:text-white' : 'text-white'
	const variants = {
		initial: { opacity: 0 },
		animate: { opacity: 1, transition: { delay: 0.7, duration: 0.3 } },
		exit: { opacity: 0 },
	}

	if (!session) {
		return (
			<motion.div
				variants={variants}
				initial="initial"
				animate="animate"
				exit="exit"
				className="z-40">
				<button
					onClick={() => signIn()}
					type="button"
					className={`group-hover text-md flex gap-3 rounded-xl p-1 px-3 hover:bg-green-800 ${textColor} bg-green-400 shadow-sm`}>
					Sign In
				</button>
			</motion.div>
		)
	}

	return (
		<div className="">
			<button
				onClick={() => signOut()}
				type="button"
				className="group-hover text-md flex gap-3 rounded-xl bg-red-400 p-1 px-3 text-white shadow-sm hover:bg-red-800 hover:text-white">
				Sign Out
			</button>
		</div>
	)
}
