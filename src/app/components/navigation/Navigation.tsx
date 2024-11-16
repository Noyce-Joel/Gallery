import React, { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const tips = [
	{
		text: 'Navigate with',
		keys: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
		icons: ['←', '→', '↑', '↓'],
	},
	{
		text: 'Zoom with',
		keys: ['w', 's'],
		icons: ['W', 'S'],
	},
]

const KeyIcon = ({ icon, pressed }: { icon: string; pressed: boolean }) => (
	<span
		className={`flex h-[2.8vw] w-[2.8vw] items-center justify-center rounded-md ${
			pressed ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-200'
		} text-[1.4vw] font-bold`}>
		{icon}
	</span>
)

const KeyGrid = ({
	keys,
	icons,
	pressedKeys,
}: {
	keys: string[]
	icons: string[]
	pressedKeys: Set<string>
}) => {
	if (keys.length === 2) {
		// Layout for 'w' and 's' keys
		return (
			<div className="grid w-10 grid-cols-1 gap-2">
				<KeyIcon icon={icons[0]} pressed={pressedKeys.has(keys[0])} />
				<KeyIcon icon={icons[1]} pressed={pressedKeys.has(keys[1])} />
			</div>
		)
	}
	return (
		<div className="grid w-[10vw] grid-cols-3 gap-[0.5vw]">
			<div className="col-span-1 gap-[0.5vw]"></div>
			<KeyIcon icon={icons[2]} pressed={pressedKeys.has(keys[2])} />
			<div className="cols-span-1"></div>
			<KeyIcon icon={icons[0]} pressed={pressedKeys.has(keys[0])} />
			<KeyIcon icon={icons[3]} pressed={pressedKeys.has(keys[3])} />
			<KeyIcon icon={icons[1]} pressed={pressedKeys.has(keys[1])} />
		</div>
	)
}

const NavigationTips = () => {
	const [currentTip, setCurrentTip] = useState(0)
	const [showTips, setShowTips] = useState(true)
	const [pressedKeys, setPressedKeys] = useState(new Set<string>())
	const [allTipsCompleted, setAllTipsCompleted] = useState(false)

	useEffect(() => {
		// Check if the user has completed the tips before
		const tipsCompleted = localStorage.getItem('navigationTipsCompleted')
		if (tipsCompleted === 'true') {
			setShowTips(false)
		}
	}, [])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const key = event.key
			if (tips[currentTip].keys.includes(key)) {
				setPressedKeys((prevKeys) => new Set(prevKeys).add(key))
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [currentTip])

	useEffect(() => {
		if (pressedKeys.size === tips[currentTip].keys.length) {
			const timer = setTimeout(() => {
				if (currentTip === tips.length - 1) {
					setAllTipsCompleted(true)
					// Mark the tips as completed in localStorage
					localStorage.setItem('navigationTipsCompleted', 'true')
					setTimeout(() => setShowTips(false), 2000)
				} else {
					setCurrentTip((prevTip) => prevTip + 1)
					setPressedKeys(new Set())
				}
			}, 1000)

			return () => clearTimeout(timer)
		}
	}, [pressedKeys, currentTip])

	if (!showTips) return null

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key="tips-container"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 1, ease: 'easeOut' }}
				className="fixed bottom-4 right-4 flex w-fit gap-8 rounded-lg bg-gray-800 p-[1.8vw] text-white shadow-lg">
				<button
					onClick={() => {
						setShowTips(false)
						localStorage.setItem('navigationTipsCompleted', 'true')
					}}
					className="absolute right-0 top-0 py-[1vh] text-gray-400 transition-colors hover:text-white">
					<X className="h-[1vw] w-[1vw]" />
				</button>
				<div className="flex-1">
					<AnimatePresence mode="wait">
						<motion.p
							key={currentTip}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
							className="flex h-full items-center text-[1.4vw] leading-relaxed">
							{tips[currentTip].text}
						</motion.p>
					</AnimatePresence>
				</div>

				<div className="flex items-center justify-center">
					<KeyGrid
						keys={tips[currentTip].keys}
						icons={tips[currentTip].icons}
						pressedKeys={pressedKeys}
					/>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}

export default NavigationTips
