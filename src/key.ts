/**
 * Represents key event
 * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#an-overview}
 */
export interface Key extends Modifiers {
  /**
   * Text representation of the `unicode-key-code` field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  key: string;
  /**
   * Text representation of the `event-type` sub-field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#event-types}
   */
  event: "press" | "repeat" | "release";
  /**
   * Text representation of the `shifted-key-code` field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  shift_key?: string;
  /**
   * Text representation of the `base-layout-key-code` field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  base_key?: string;
  /**
   * Text representation of the `text-as-codepoints` field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#text-as-code-points}
   */
  text?: string;
  /**
   * Name of the functional key
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#functional-key-definitions}
   */
  name?: string;
}

/**
 * Represents modifier keys
 * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#modifiers}
 */
export interface Modifiers {
  /**
   * SHIFT
   */
  shift?: boolean;
  /**
   * ALT/OPTION
   */
  alt?: boolean;
  /**
   * CONTROL
   */
  ctrl?: boolean;
  /**
   * WINDOWS/LINUX/COMMAND
   */
  super?: boolean;
  /**
   * HYPER
   */
  hyper?: boolean;
  /**
   * META
   */
  meta?: boolean;
  /**
   * CAPS LOCK
   */
  caps_lock?: boolean;
  /**
   * NUM LOCK
   */
  num_lock?: boolean;
}
