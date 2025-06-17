import { type KeyEvent, parse_key_event } from "./key.ts";

const decoder = new TextDecoder();

/**
 * Parse key event from bytes
 */
export function parse(buf: Uint8Array): KeyEvent | string {
  const text = decoder.decode(buf);

  const ev = parse_key_event(text);
  if (ev) {
    return ev;
  }

  return text;
}
