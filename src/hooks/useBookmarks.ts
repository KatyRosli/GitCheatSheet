import { useCallback, useEffect, useMemo, useState } from 'react';

// Key kept from earlier versions so existing visitors keep their bookmarks.
const STORAGE_KEY = 'codex_bookmarks';
const DEFAULT_BOOKMARKS = ['git-merge', 'git-rebase', 'git-reflog'];

function loadBookmarks(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as string[]) : DEFAULT_BOOKMARKS;
  } catch {
    return DEFAULT_BOOKMARKS;
  }
}

/** Bookmarked command ids, persisted in localStorage. */
export function useBookmarks() {
  const [ids, setIds] = useState<string[]>(loadBookmarks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Storage can be unavailable (private mode, blocked cookies); bookmarks then last for the session.
    }
  }, [ids]);

  const toggleBookmark = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }, []);

  const bookmarkedIds = useMemo(() => new Set(ids), [ids]);

  return { bookmarkedIds, toggleBookmark };
}
