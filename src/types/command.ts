/** The four kinds of command shown on the cheat sheet. */
export type CommandCategory = 'action' | 'inspect' | 'utility' | 'recovery';

/** A copy-ready example, e.g. `git clone --depth=<depth> <remote-url>`. */
export interface CommandSnippet {
  id: string;
  sequenceNum: string;
  command: string;
  description: string;
  /** `<placeholder>` tokens in `command` the user can fill in. */
  parameters: {
    name: string;
    description: string;
    defaultValue: string;
  }[];
}

export interface CommandFlag {
  flag: string;
  alias?: string;
  description: string;
  /** Flags that can discard work are highlighted. */
  danger?: boolean;
}

export interface CommandCaution {
  level: 'warning' | 'destructive';
  title: string;
  details: string;
}

export interface GitCommand {
  id: string;
  title: string;
  command: string;
  category: CommandCategory;
  /** Two-digit display number, e.g. "07". */
  number: string;
  etymology: string;
  summary: string;
  description: string;
  snippets: CommandSnippet[];
  flags: CommandFlag[];
  caution?: CommandCaution;
  tip: string;
  /** Ids of related commands. */
  seeAlso: string[];
}
