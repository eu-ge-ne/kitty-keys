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
   * SUPER/COMMAND
   */
  super?: boolean;

  /**
   * CAPS LOCK
   */
  caps_lock?: boolean;

  /**
   * NUM LOCK
   */
  num_lock?: boolean;
}

export function parse_modifiers(
  text: string | undefined,
): Modifiers {
  const result: Modifiers = {};

  if (text) {
    let flags = Number.parseInt(text);

    if (Number.isSafeInteger(flags)) {
      flags -= 1;

      const shift = Boolean(flags & 1);
      if (shift) {
        result.shift = true;
      }

      const alt = Boolean(flags & 2);
      if (alt) {
        result.alt = true;
      }

      const ctrl = Boolean(flags & 4);
      if (ctrl) {
        result.ctrl = true;
      }

      const super_ = Boolean(flags & 8);
      if (super_) {
        result.super = true;
      }

      const caps_lock = Boolean(flags & 64);
      if (caps_lock) {
        result.caps_lock = true;
      }

      const num_lock = Boolean(flags & 128);
      if (num_lock) {
        result.num_lock = true;
      }
    }
  }

  return result;
}
