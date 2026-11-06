import { useEffect, useRef, type MouseEvent } from 'react';
import { commandElementId } from '../../lib/scrollToCommand';
import type { GitCommand } from '../../types/command';
import { CommandCard } from './CommandCard';

interface CommandDialogProps {
  command: GitCommand;
  isBookmarked: boolean;
  onToggleBookmark: (commandId: string) => void;
  onSelectRelated: (commandId: string) => void;
  onClose: () => void;
}

/**
 * Full-screen view of one command. Uses the native <dialog> for focus trapping,
 * Esc to close and an inert page behind it.
 */
export function CommandDialog({ command, onClose, ...cardProps }: CommandDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();

    // Stop the page behind from scrolling while the pop-up is open.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, []);

  // Clicking the dimmed area around the card closes the pop-up.
  const closeOnBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby={`${commandElementId(command.id)}-dialog-title`}
      className="fixed inset-0 m-0 w-screen h-dvh max-w-none max-h-none p-0 overflow-y-auto bg-[var(--bg)]/85 backdrop-blur-sm text-[var(--ink)] backdrop:bg-black/50"
    >
      <div onClick={closeOnBackdrop} className="min-h-full flex items-start justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-5xl">
          <CommandCard {...cardProps} command={command} variant="fullscreen" onClose={onClose} />
        </div>
      </div>
    </dialog>
  );
}
