import { csi_name } from "./csi.ts";
import { Event } from "./event.ts";
import { type Modifiers, parse_modifiers } from "./modifiers.ts";

/**
 * Represents functional key or text key with modifiers
 */
export interface Key extends Modifiers {
  /**
   * Name of the key
   */
  name: string;

  event: Event;
}

export function new_key(
  name: string,
  mods: Modifiers = {},
  event: Event = Event.press,
): Key {
  return {
    name,
    event,
    ...mods,
  };
}

export function parse_key(code: string, mods?: string, ev?: string): Key {
  const event = ev === "3"
    ? Event.release
    : ev === "2"
    ? Event.repeat
    : Event.press;

  return new_key(csi_name(code), parse_modifiers(mods), event);
}
