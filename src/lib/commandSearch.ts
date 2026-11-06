import { CATEGORY_LABELS } from '../config/commandFilters';
import type { GitCommand } from '../types/command';

/** Card label, e.g. "Inspect · No. 16". */
export const commandLabel = (command: GitCommand): string =>
  `${CATEGORY_LABELS[command.category]} · No. ${command.number}`;

const normalize = (text: string): string => text.toLowerCase().trim();

/** True when the query appears anywhere a user would expect to search. */
export function matchesQuery(command: GitCommand, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;

  const haystack = [
    command.title,
    command.command,
    commandLabel(command),
    command.summary,
    command.description,
    ...command.snippets.flatMap((s) => [s.command, s.description]),
    ...command.flags.map((f) => f.flag),
  ];
  return haystack.some((text) => text.toLowerCase().includes(q));
}

/** 0 = exact name ("checkout" / "git checkout"), 1 = name contains the query, 2 = matched elsewhere. */
function relevance(command: GitCommand, q: string): number {
  const title = command.title.toLowerCase();
  const name = command.command.toLowerCase();
  if (title === q || name === q || name === `git ${q}`) return 0;
  if (title.includes(q) || name.includes(q)) return 1;
  return 2;
}

/** Commands matching the query, best match first. Stable for equal relevance. */
export function searchCommands(commands: readonly GitCommand[], query: string): GitCommand[] {
  const q = normalize(query);
  const matches = commands.filter((command) => matchesQuery(command, q));
  if (!q) return matches;
  return matches.sort((a, b) => relevance(a, q) - relevance(b, q));
}
