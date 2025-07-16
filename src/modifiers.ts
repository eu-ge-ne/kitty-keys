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

const NO_MODIFIERS: Modifiers = {
  shift: false,
  alt: false,
  ctrl: false,
  super: false,
  caps_lock: false,
  num_lock: false,
};

export function parse_modifiers(modifiers: string | undefined): Modifiers {
  if (!modifiers) {
    return NO_MODIFIERS;
  }

  const n = Number.parseInt(modifiers) - 1;

  const result: Modifiers = {
    shift: Boolean(n & 1),
    alt: Boolean(n & 2),
    ctrl: Boolean(n & 4),
    super: Boolean(n & 8),
    caps_lock: Boolean(n & 64),
    num_lock: Boolean(n & 128),
  };

  return result;
}
