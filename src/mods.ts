/**
 * Modifiers
 */
export interface Mods {
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

export function parse_mods(mods?: string): Mods | undefined {
  if (typeof mods === "string") {
    const n = Number.parseInt(mods, 10) - 1;

    return {
      shift: Boolean(n & 1),
      alt: Boolean(n & 2),
      ctrl: Boolean(n & 4),
      super: Boolean(n & 8),
      hyper: Boolean(n & 16),
      meta: Boolean(n & 32),
      caps_lock: Boolean(n & 64),
      num_lock: Boolean(n & 128),
    };
  }
}
