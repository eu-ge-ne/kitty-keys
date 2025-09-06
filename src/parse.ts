import { Key } from "./key.ts";
import { key_name } from "./name.ts";

/**
 * Result returned from {@link parse_key} invocation
 */
export type Result = [Key, number];

const decoder: TextDecoder = new TextDecoder();

/**
 * Parse key from bytes
 * @param bytes
 * @returns {@link Result}
 */
export function parse_key(bytes: Uint8Array): Result | undefined {
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

  return parse_kitty(bytes);
}

const PREFIX_RE = String.raw`(\x1b\x5b|\x1b\x4f)`;
const CODES_RE = String.raw`(?:(\d+)(?::(\d*))?(?::(\d*))?)?`;
const PARAMS_RE = String.raw`(?:;(\d*)?(?::(\d*))?)?`;
const CODEPOINTS_RE = String.raw`(?:;([\d:]*))?`;
const SCHEME_RE = String.raw`([u~ABCDEFHPQS])`;

const RE = new RegExp(
  PREFIX_RE + CODES_RE + PARAMS_RE + CODEPOINTS_RE + SCHEME_RE,
);

function parse_kitty(bytes: Uint8Array): Result | undefined {
  const match = decoder.decode(bytes).match(RE);
  if (!match) {
    return;
  }

  const prefix = match[1]!;
  const code = parse_number(match[2]);
  const shift_code = parse_number(match[3]);
  const base_layout_code = parse_number(match[4]);
  const scheme = match[8]!;

  const key = new Key();
  key.name = key_name(prefix, code, scheme);
  key.code = code;
  key.shift_code = shift_code;
  key.base_code = base_layout_code;

  key.parse_modifiers(match[5]);
  key.parse_event(match[6]);
  key.parse_code_points(match[7]);

  return [key, match.index! + match[0].length];
}

function parse_number(text?: string): number | undefined {
  if (text) {
    const n = Number.parseInt(text);
    if (Number.isSafeInteger(n)) {
      return n;
    }
  }
}
