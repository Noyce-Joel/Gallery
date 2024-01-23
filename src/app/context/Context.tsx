'use client'
import { ContextOptions } from 'html2canvas/dist/types/core/context';
import React, { Context, Dispatch, SetStateAction, createContext, useState } from 'react';

export interface ThemeContextProps {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
  }
// Create the context
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const currentHour = new Date().getHours();
  const isDayTime = currentHour >= 5 && currentHour < 14;
    const [theme, setTheme] = useState<string>(isDayTime ? "light" : "dark");
  
    // Provide the state to the children
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }