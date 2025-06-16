import { csi_name } from "./csi.ts";
import type { Event } from "./event.ts";
import { type Modifiers, parse_modifiers } from "./modifiers.ts";

/**
 * Represents functional key or text key with modifiers
 */
export interface Key extends Modifiers {
  /**
   * Name of the key
   */
  name: string;

  event: "press" | "repeat" | "release";
}

export function new_key(
  name: string,
  mods: Modifiers = {},
  event: Event = "press",
): Key {
  return {
    name,
    event,
    ...mods,
  };
}

export function parse_key(code: string, mods?: string, ev?: string): Key {
  const event = ev === "3" ? "release" : ev === "2" ? "repeat" : "press";

  return new_key(csi_name(code), parse_modifiers(mods), event);
}
