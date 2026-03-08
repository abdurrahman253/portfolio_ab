'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;           // ← hydration error থেকে বাঁচাবে

  const isDark = theme === 'night';   // ← 'dark' না, 'night'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'night')}  // ← fix
      className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 
                 dark:hover:text-indigo-400 transition-transform hover:scale-105"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;