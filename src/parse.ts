import { Key, type Modifiers } from "./key.ts";
import { key_name } from "./name.ts";

/**
 * Result returned from {@link parse_key} invocation
 */
export type Result = [Key | string | undefined, number];

const decoder: TextDecoder = new TextDecoder();

/**
 * Parse key from bytes
 * @param bytes
 * @returns {@link Result}
 */
export function parse_key(bytes: Uint8Array): Result {
  if (bytes.length === 0) {
    return [undefined, 0];
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
    return [decoder.decode(bytes.subarray(0, next_esc_i)), next_esc_i];
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

function parse_kitty(bytes: Uint8Array): Result {
  const match = decoder.decode(bytes).match(RE);
  if (!match) {
    return [undefined, 0];
  }

  const prefix = match[1]!;
  const code = parse_number(match[2]);
  const shift_code = parse_number(match[3]);
  const base_layout_code = parse_number(match[4]);
  const modifiers = parse_modifiers(match[5]);
  const event = parse_event(match[6]);
  const codepoints = parse_code_points(match[7]);
  const scheme = match[8]!;

  const key = new Key();
  key.name = key_name(prefix, code, scheme);
  key.code = code;
  key.shift_code = shift_code;
  key.base_code = base_layout_code;
  key.event = event;
  key.text = codepoints;
  Object.assign(key, modifiers);

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

function parse_modifiers(text: string | undefined): Modifiers {
  let flags = 0;

  if (text) {
    flags = Number.parseInt(text);

    if (Number.isSafeInteger(flags)) {
      flags -= 1;
    }
  }

  const result: Modifiers = {
    shift: Boolean(flags & 1),
    alt: Boolean(flags & 2),
    ctrl: Boolean(flags & 4),
    super: Boolean(flags & 8),
    caps_lock: Boolean(flags & 64),
    num_lock: Boolean(flags & 128),
  };

  return result;
}

function parse_event(event?: string): Key["event"] {
  switch (event) {
    case "1":
      return "press";
    case "2":
      return "repeat";
    case "3":
      return "release";
  }

  return "press";
}

function parse_code_points(
  code_points: string | undefined,
): string | undefined {
  if (code_points) {
    return String.fromCodePoint(
      ...code_points.split(":").map((x) => Number.parseInt(x)).filter((x) =>
        Number.isSafeInteger(x)
      ),
    );
  }
}
