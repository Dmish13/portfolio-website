'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved theme, default to light mode if nothing saved
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } else {
      // Default to light mode
      setTheme('light')
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [])

  const toggleTheme = () => {
    if (!mounted) return
    
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    console.log('Toggling from', theme, 'to', newTheme)
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode: theme === 'dark', toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  return context
}
