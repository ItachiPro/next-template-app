'use client'

import { useTheme } from 'next-themes'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className="rounded-2xl"
      aria-label="Toggle theme"
      onClick={() => setTheme(next)}
    >
      {theme === 'dark' ? 'light' : 'dark'}
    </button>
  )
}

export default ThemeToggle
