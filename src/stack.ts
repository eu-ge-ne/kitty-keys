import { type Flags, stringify_flags } from "./flags.ts";

/**
 * https://sw.kovidgoyal.net/kitty/keyboard-protocol/#progressive-enhancement
 */
export function new_push(flags: Flags): string {
  const f = stringify_flags(flags);

  return `\x1b[>${f}u`;
}

/**
 * https://sw.kovidgoyal.net/kitty/keyboard-protocol/#progressive-enhancement
 */
export function new_pop(number: number): string {
  return `\x1b[<${number}u`;
}
