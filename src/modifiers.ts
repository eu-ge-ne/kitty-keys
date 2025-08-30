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
