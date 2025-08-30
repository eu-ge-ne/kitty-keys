/**
 * Represents key
 * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#an-overview}
 */
export class Key implements Modifiers {
  /**
   * Name of the key
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#functional-key-definitions}
   */
  name = "";

  /**
   * `unicode-key-code` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  code: number | undefined;

  /**
   * `shifted-key-code` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  shift_code: number | undefined;

  /**
   * `base-layout-key-code` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  base_code: number | undefined;

  /**
   * Text representation of the `event-type` sub-field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#event-types}
   */
  event: "press" | "repeat" | "release" = "press";

  /**
   * Text representation of the `text-as-codepoints` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#text-as-code-points}
   */
  text?: string;

  shift = false;
  alt = false;
  ctrl = false;
  super = false;
  caps_lock = false;
  num_lock = false;
}

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
