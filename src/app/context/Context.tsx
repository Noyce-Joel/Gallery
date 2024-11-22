'use client'

import React, {
	Dispatch,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from 'react'

export interface ThemeContextProps {
	theme: string
	setTheme: Dispatch<SetStateAction<string>>
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
	undefined,
)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<string>('light')

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme) {
			setTheme(savedTheme)
		} else {
			const currentHour = new Date().getHours()
			const isDayTime = currentHour >= 5 && currentHour < 19
			setTheme(isDayTime ? 'light' : 'dark')
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('theme', theme)
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
