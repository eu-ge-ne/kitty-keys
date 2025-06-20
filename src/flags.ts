export interface Flags {
  /**
   * 0b1 (1) Disambiguate escape codes
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#disambiguate-escape-codes}
   */
  disambiguate?: boolean;

  /**
   * 0b10 (2) Report event types
   * https://sw.kovidgoyal.net/kitty/keyboard-protocol/#report-events
   */
  events?: boolean;

  /**
   * 0b100 (4) Report alternate keys
   * https://sw.kovidgoyal.net/kitty/keyboard-protocol/#report-alternates
   */
  alternate_keys?: boolean;

  /**
   * 0b1000 (8) Report all keys as escape codes
   * https://sw.kovidgoyal.net/kitty/keyboard-protocol/#report-all-keys
   */
  escape_codes?: boolean;

  /**
   * 0b10000 (16) Report associated text
   * https://sw.kovidgoyal.net/kitty/keyboard-protocol/#report-text
   */
  text?: boolean;
}
