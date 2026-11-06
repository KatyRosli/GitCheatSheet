import { useCallback, useEffect, useState } from 'react';

// Key kept from earlier versions so existing visitors keep their theme.
const STORAGE_KEY = 'codex_theme';
/** Class on <html> that switches the CSS variables to the light palette. */
const LIGHT_CLASS = 'light';

function loadIsDark(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? saved === 'dark' : true;
  } catch {
    return true;
  }
}

/** Dark/light theme, persisted in localStorage. Dark is the default. */
export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(loadIsDark);

  useEffect(() => {
    document.documentElement.classList.toggle(LIGHT_CLASS, !isDarkMode);
    try {
      localStorage.setItem(STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    } catch {
      // Storage unavailable; the theme still applies for this session.
    }
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => setIsDarkMode((prev) => !prev), []);

  return { isDarkMode, toggleTheme };
}
