/** DOM id of a command card, shared by the card and anything that scrolls to it. */
export const commandElementId = (commandId: string): string => `command-${commandId}`;

const HIGHLIGHT_CLASS = 'is-highlighted';
const HIGHLIGHT_MS = 1600;

/**
 * Scrolls a command card into view, optionally flashing a highlight.
 * Waits a tick so it works right after a state change that re-renders the list.
 */
export function scrollToCommand(commandId: string, { highlight = false } = {}): void {
  window.setTimeout(() => {
    const element = document.getElementById(commandElementId(commandId));
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (highlight) {
      element.classList.add(HIGHLIGHT_CLASS);
      window.setTimeout(() => element.classList.remove(HIGHLIGHT_CLASS), HIGHLIGHT_MS);
    }
  }, 50);
}
