import { Key } from "./key.ts";

const decoder: TextDecoder = new TextDecoder();

/**
 * Parse key from bytes
 * @param bytes
 * @returns {@link Result}
 */
export function parse_key(bytes: Uint8Array): [Key, number] | undefined {
  if (bytes.length === 0) {
    return;
  }

  const b = bytes[0];

  if ((b === 0x1b) && (bytes.length === 1)) {
    const key = new Key();
    key.name = "ESC";
    return [key, 1];
  }

  if (b === 0x0d) {
    const key = new Key();
    key.name = "ENTER";
    return [key, 1];
  }

  if (b === 0x09) {
    const key = new Key();
    key.name = "TAB";
    return [key, 1];
  }

  if (b === 0x7f || b === 0x08) {
    const key = new Key();
    key.name = "BACKSPACE";
    return [key, 1];
  }

  if (b !== 0x1b) {
    let next_esc_i = bytes.indexOf(0x1b, 1);
    if (next_esc_i < 0) {
      next_esc_i = bytes.length;
    }
    const key = new Key();
    key.name = key.text = decoder.decode(bytes.subarray(0, next_esc_i));
    return [key, next_esc_i];
  }

  return Key.parse_kitty(bytes);
}
