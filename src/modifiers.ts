/**
 * Modifiers
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

export function parse_modifiers(mods?: string): Modifiers | undefined {
  if (typeof mods === "string") {
    const n = Number.parseInt(mods, 10) - 1;

    const result: Modifiers = {};

    if (n & 1) {
      result.shift = true;
    }

    if (n & 2) {
      result.alt = true;
    }

    if (n & 4) {
      result.ctrl = true;
    }

    if (n & 8) {
      result.super = true;
    }

    if (n & 16) {
      result.hyper = true;
    }

    if (n & 32) {
      result.meta = true;
    }

    if (n & 64) {
      result.caps_lock = true;
    }

    if (n & 128) {
      result.num_lock = true;
    }

    return result;
  }
}
