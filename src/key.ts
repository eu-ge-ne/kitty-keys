export interface Key extends Modifiers {
  key: string;
  type: "press" | "repeat" | "release";
  shift_key?: string;
  base_key?: string;
  text?: string;
}

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
