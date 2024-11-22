'use client'

import React, { Dispatch, SetStateAction, createContext, useState } from 'react'

export interface ThemeContextProps {
	theme: string
	setTheme: Dispatch<SetStateAction<string>>
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
	undefined,
)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const currentHour = new Date().getHours()
	const isDayTime = currentHour >= 5 && currentHour < 14
	const [theme, setTheme] = useState<string>('dark')
	
	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
