import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, Bookmark } from 'lucide-react';
import type { CommandCategory, GitCommand } from '../types/command';

/** Display name for each category, shared by filter buttons and card labels. */
export const CATEGORY_LABELS: Record<CommandCategory, string> = {
  action: 'Actions',
  inspect: 'Inspect',
  utility: 'Utilities',
  recovery: 'Undo & Recovery',
};

export type FilterId = 'all' | CommandCategory | 'destructive' | 'bookmarked';

export interface FilterContext {
  bookmarkedIds: ReadonlySet<string>;
}

export interface CommandFilter {
  id: FilterId;
  label: string;
  /** Tooltip text. */
  hint: string;
  icon?: LucideIcon;
  /** `danger` renders the active state in the warning colour. */
  tone?: 'default' | 'danger';
  matches: (command: GitCommand, context: FilterContext) => boolean;
}

const byCategory =
  (category: CommandCategory) =>
  (command: GitCommand): boolean =>
    command.category === category;

/**
 * The filter buttons, in display order. Only one is active at a time.
 * To add a filter, add an entry here — no component changes are needed.
 */
export const COMMAND_FILTERS: readonly CommandFilter[] = [
  {
    id: 'all',
    label: 'All',
    hint: 'Every command',
    matches: () => true,
  },
  {
    id: 'action',
    label: CATEGORY_LABELS.action,
    hint: 'Commands that change your repo: init, add, commit, merge, push…',
    matches: byCategory('action'),
  },
  {
    id: 'inspect',
    label: CATEGORY_LABELS.inspect,
    hint: 'Look at state and history: status, branch, log, show, blame',
    matches: byCategory('inspect'),
  },
  {
    id: 'utility',
    label: CATEGORY_LABELS.utility,
    hint: 'Helpers: config, diff, stash, bisect, remote, fsck',
    matches: byCategory('utility'),
  },
  {
    id: 'recovery',
    label: CATEGORY_LABELS.recovery,
    hint: 'Roll back or recover work: reset, reflog',
    matches: byCategory('recovery'),
  },
  {
    id: 'destructive',
    label: 'Destructive',
    hint: 'Commands that can permanently lose work',
    icon: AlertTriangle,
    tone: 'danger',
    matches: (command) => command.caution !== undefined,
  },
  {
    id: 'bookmarked',
    label: 'Bookmarked',
    hint: 'Commands you have bookmarked',
    icon: Bookmark,
    matches: (command, { bookmarkedIds }) => bookmarkedIds.has(command.id),
  },
];

export const DEFAULT_FILTER_ID: FilterId = 'all';
