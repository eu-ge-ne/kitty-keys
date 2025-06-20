import { type Flags, stringify_flags } from "./flags.ts";

/**
 * https://sw.kovidgoyal.net/kitty/keyboard-protocol/#progressive-enhancement
 */
export function new_request(
  flags: Flags,
  mode: "all" | "set" | "reset" = "all",
): string {
  return `\x1b[=${stringify_flags(flags)}u`;
}
