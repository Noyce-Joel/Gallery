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
    // Create the state
    const [theme, setTheme] = useState<string>('dark');
  
    // Provide the state to the children
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }