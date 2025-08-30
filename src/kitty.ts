import { decoder } from "./codec.ts";
import type { Key } from "./key.ts";
import type { Modifiers } from "./modifiers.ts";

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

export function parseKitty(bytes: Uint8Array): KittyResult | undefined {
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
