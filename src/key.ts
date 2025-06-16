import { csi_name } from "./csi.ts";
import { type Modifiers, parse_modifiers } from "./modifiers.ts";

/**
 * Represents functional key or text key with modifiers
 */
export interface Key extends Modifiers {
  /**
   * Name of the key
   */
  name: string;
}

export function new_key(name: string, mods: Modifiers = {}): Key {
  return {
    name,
    ...mods,
  };
}

export function parse_key(code: string, mods?: string): Key {
  return new_key(csi_name(code), parse_modifiers(mods));
}
