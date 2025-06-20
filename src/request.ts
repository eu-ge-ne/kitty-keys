import { type Flags, stringify_flags } from "./flags.ts";

/**
 * https://sw.kovidgoyal.net/kitty/keyboard-protocol/#progressive-enhancement
 */
export function new_request(
  flags: Flags,
  mode: "all" | "set" | "reset" = "all",
): string {
  const f = stringify_flags(flags);

  const m = mode === "set" ? ";2" : mode === "reset" ? ";3" : "";

  return `\x1b[=${f}${m}u`;
}
