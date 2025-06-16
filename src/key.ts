import type { Mods } from "./mods.ts";

/**
 * Key event
 */
export abstract class Key {
  /**
   * Modifiers
   */
  mods: Mods;

  /**
   * Creates an instance of Key
   */
  constructor(mods: Mods = {}) {
    this.mods = mods;
  }
}
