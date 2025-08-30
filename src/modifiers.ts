/**
 * Represents modifier keys
 * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#modifiers}
 */
export interface Modifiers {
  /**
   * SHIFT
   */
  shift: boolean;

  /**
   * ALT/OPTION
   */
  alt: boolean;

  /**
   * CONTROL
   */
  ctrl: boolean;

  /**
   * SUPER/COMMAND
   */
  super: boolean;

  /**
   * CAPS LOCK
   */
  caps_lock: boolean;

  /**
   * NUM LOCK
   */
  num_lock: boolean;
}

export function parse_modifiers(text: string | undefined): Modifiers {
  let flags = 0;

  if (text) {
    flags = Number.parseInt(text);

    if (Number.isSafeInteger(flags)) {
      flags -= 1;
    }
  }

  const result: Modifiers = {
    shift: Boolean(flags & 1),
    alt: Boolean(flags & 2),
    ctrl: Boolean(flags & 4),
    super: Boolean(flags & 8),
    caps_lock: Boolean(flags & 64),
    num_lock: Boolean(flags & 128),
  };

  return result;
}
