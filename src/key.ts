/**
 * Key
 */
export interface Key extends Modifiers {
  /**
   * Key
   */
  key: string;
  /**
   * Event
   */
  event: "press" | "repeat" | "release";
  /**
   * Shifted key
   */
  shift_key?: string;
  /**
   * Base layout key
   */
  base_key?: string;
  /**
   * Text
   */
  text?: string;
  /**
   * Name
   */
  name?: string;
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
