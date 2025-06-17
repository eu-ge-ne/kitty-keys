import {
  is_unicode_key_event,
  parse_unicode_key_event,
  type UnicodeKeyEvent,
} from "./key.ts";

const decoder = new TextDecoder();

/**
 * Parse key event from bytes
 */
export function parse(buf: Uint8Array): UnicodeKeyEvent | string {
  const text = decoder.decode(buf);

  if (is_unicode_key_event(text)) {
    return parse_unicode_key_event(text);
  }

  return text;
}
