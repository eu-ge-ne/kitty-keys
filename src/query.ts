import { type Flags, parse_flags } from "./flags.ts";

const decoder = new TextDecoder();

/**
 * https://sw.kovidgoyal.net/kitty/keyboard-protocol/#progressive-enhancement
 */
export const query = "\x1b[?u";

/**
 * https://sw.kovidgoyal.net/kitty/keyboard-protocol/#progressive-enhancement
 */
export function parse_reply(bytes: Uint8Array): Flags | undefined {
  const text = decoder.decode(bytes);

  if (!text.startsWith("\x1b[?") || text.at(-1) !== "u") {
    return;
  }

  return parse_flags(text.slice(3, -1));
}
