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

  const x = parse_kitty(bytes);
  if (!x) {
    return [undefined, 0];
  }

  const key = new Key();

  key.name = key_name(x.prefix, x.unicode_code, x.scheme);
  key.code = x.unicode_code;
  key.shift_code = x.shifted_code;
  key.base_code = x.base_layout_code;
  key.event = x.event;
  key.text = x.codepoints;
  Object.assign(key, x.modifiers);

  return [key, x.index + x.length];
}

const PREFIX_RE = String.raw`(\x1b\x5b|\x1b\x4f)`;
const CODES_RE = String.raw`(?:(\d+)(?::(\d*))?(?::(\d*))?)?`;
const PARAMS_RE = String.raw`(?:;(\d*)?(?::(\d*))?)?`;
const CODEPOINTS_RE = String.raw`(?:;([\d:]*))?`;
const SCHEME_RE = String.raw`([u~ABCDEFHPQS])`;

const RE = new RegExp(
  PREFIX_RE + CODES_RE + PARAMS_RE + CODEPOINTS_RE + SCHEME_RE,
);

interface KittyResult {
  prefix: string;
  unicode_code: number | undefined;
  shifted_code: number | undefined;
  base_layout_code: number | undefined;
  modifiers: Modifiers;
  event: Key["event"];
  codepoints: string | undefined;
  scheme: string;
  index: number;
  length: number;
}

function parse_kitty(bytes: Uint8Array): KittyResult | undefined {
  const match = decoder.decode(bytes).match(RE);
  if (match) {
    const [
      ,
      prefix,
      unicode_code,
      shifted_code,
      base_layout_code,
      modifiers,
      event,
      codepoints,
      scheme,
    ] = match;

    return {
      prefix: prefix!,
      unicode_code: parse_number(unicode_code),
      shifted_code: parse_number(shifted_code),
      base_layout_code: parse_number(base_layout_code),
      modifiers: parse_modifiers(modifiers),
      event: parse_event(event),
      codepoints: parse_code_points(codepoints),
      scheme: scheme!,
      index: match.index!,
      length: match[0].length,
    };
  }
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
