import { decoder } from "./codec.ts";
import type { KittyKey } from "./key.ts";
import { type Modifiers, parse_modifiers } from "./modifiers.ts";
import { key_name } from "./name.ts";

export function parse_kitty_key(
  bytes: Uint8Array,
): [KittyKey | undefined, number] {
  const x = parseBytes(bytes);
  if (!x) {
    return [undefined, 0];
  }

  const key: KittyKey = {
    name: key_name(x.prefix, x.unicode_code, x.scheme),
    code: x.unicode_code,
    shift_code: x.shifted_code,
    base_code: x.base_layout_code,
    event: x.event,
    ...x.modifiers,
  };

  const text = parse_code_points(x.codepoints);
  if (typeof text === "string") {
    key.text = text;
  }

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

interface ParseBytesResult {
  prefix: string;
  unicode_code: number | undefined;
  shifted_code: number | undefined;
  base_layout_code: number | undefined;
  modifiers: Modifiers;
  event: KittyKey["event"];
  codepoints?: string;
  scheme: string;
  index: number;
  length: number;
}

export function parseBytes(bytes: Uint8Array): ParseBytesResult | undefined {
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
      codepoints,
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

function parse_event(event?: string): KittyKey["event"] {
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

function parse_code_points(code_points = ""): string | undefined {
  if (code_points) {
    return String.fromCodePoint(
      ...code_points.split(":").map((x) => Number.parseInt(x)).filter((x) =>
        Number.isSafeInteger(x)
      ),
    );
  }
}
