import { useState } from 'react';
import type { GitCommand } from '../../types/command';
import { CommandCard } from './CommandCard';
import { CommandDialog } from './CommandDialog';

interface CommandListProps {
  commands: readonly GitCommand[];
  bookmarkedIds: ReadonlySet<string>;
  onToggleBookmark: (commandId: string) => void;
  onSelectRelated: (commandId: string) => void;
}

export function CommandList({ commands, bookmarkedIds, onToggleBookmark, onSelectRelated }: CommandListProps) {
  // Kept as the object, not the id, so the pop-up stays open even if the
  // command drops out of the current filter (e.g. un-bookmarking under "Bookmarked").
  const [fullscreenCommand, setFullscreenCommand] = useState<GitCommand | null>(null);

  const closeFullscreen = () => setFullscreenCommand(null);

  return (
    <div className="space-y-4">
      <p className="text-[11pt] font-serif italic text-[var(--muted)]">
        Showing {commands.length} {commands.length === 1 ? 'command' : 'commands'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {commands.map((command) => (
          <CommandCard
            key={command.id}
            command={command}
            isBookmarked={bookmarkedIds.has(command.id)}
            onToggleBookmark={onToggleBookmark}
            onSelectRelated={onSelectRelated}
            onExpand={() => setFullscreenCommand(command)}
          />
        ))}
      </div>

      {fullscreenCommand && (
        <CommandDialog
          command={fullscreenCommand}
          isBookmarked={bookmarkedIds.has(fullscreenCommand.id)}
          onToggleBookmark={onToggleBookmark}
          onSelectRelated={(id) => {
            closeFullscreen();
            onSelectRelated(id);
          }}
          onClose={closeFullscreen}
        />
      )}
    </div>
  );
}
