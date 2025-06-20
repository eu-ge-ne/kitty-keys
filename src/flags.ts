export interface Flags {
  /**
   * 0b1 (1) Disambiguate escape codes
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#disambiguate-escape-codes}
   */
  disambiguate?: boolean;

  /**
   * 0b10 (2) Report event types
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#report-events}
   */
  events?: boolean;

  /**
   * 0b100 (4) Report alternate keys
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#report-alternates}
   */
  alternates?: boolean;

  /**
   * 0b1000 (8) Report all keys as escape codes
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#report-all-keys}
   */
  all_keys?: boolean;

  /**
   * 0b10000 (16) Report associated text
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#report-text}
   */
  text?: boolean;
}

export function stringify_flags(flags: Flags): string {
  let result = 0;

  if (flags.disambiguate) {
    result += 1;
  }

  if (flags.events) {
    result += 2;
  }

  if (flags.alternates) {
    result += 4;
  }

  if (flags.all_keys) {
    result += 8;
  }

  if (flags.text) {
    result += 16;
  }

  return result.toString();
}
