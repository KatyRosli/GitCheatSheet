import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  const label = isDarkMode ? 'Switch to light theme' : 'Switch to dark theme';
  return (
    <button
      type="button"
      onClick={onToggle}
      className="p-1.5 text-[var(--gold)] hover:text-[var(--ink)] border border-[var(--border-gold)] rounded hover:bg-[var(--recess-bg)] transition-colors cursor-pointer"
      title={label}
      aria-label={label}
    >
      {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
