import { decoder } from "./codec.ts";
import { parse_modifiers } from "./modifiers.ts";
import { key_name } from "./name.ts";

import type { KittyKey } from "./key.ts";

export function parse_kitty_key(
  bytes: Uint8Array,
): [KittyKey | undefined, number] {
  const parsed = parseBytes(bytes);
  if (!parsed) {
    return [undefined, 0];
  }

  const {
    prefix,
    unicodeCode,
    shiftedCode,
    baseLayoutCode,
    params,
    codepoints,
    scheme,
    index,
    length,
  } = parsed;

  const [modifiers, raw_event] = (params ?? "").split(":");

  const code = parse_number(unicodeCode);

  const key: KittyKey = {
    name: key_name(prefix!, code, scheme!),
    ...parse_modifiers(modifiers),
  };

  if (typeof code === "number") {
    key.code = code;
  }

  const shifted_code = parse_number(shiftedCode);
  if (typeof shifted_code === "number") {
    key.shifted_code = shifted_code;
  }

  const base_layout_code = parse_number(baseLayoutCode);
  if (typeof base_layout_code === "number") {
    key.base_layout_code = base_layout_code;
  }

  const event = parse_event(raw_event);
  if (typeof event === "string") {
    key.event = event;
  }

  const text = parse_code_points(codepoints);
  if (typeof text === "string") {
    key.text = text;
  }

  return [key, index + length];
}

function parse_number(text?: string): number | undefined {
  if (text) {
    const n = Number.parseInt(text);
    if (Number.isSafeInteger(n)) {
      return n;
    }
  }
}

function parse_event(
  event?: string,
): "press" | "repeat" | "release" | undefined {
  switch (event) {
    case "1":
      return "press";
    case "2":
      return "repeat";
    case "3":
      return "release";
  }
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

const PREFIX_RE = String.raw`(\x1b\x5b|\x1b\x4f)`;
const CODES_RE = String.raw`(?:(\d+)(?::(\d*))?(?::(\d*))?)?`;
const PARAMS_RE = String.raw`(?:;([\d:]*))?`;
const CODEPOINTS_RE = String.raw`(?:;([\d:]*))?`;
const SCHEME_RE = String.raw`([u~ABCDEFHPQS])`;

const RE = new RegExp(
  PREFIX_RE + CODES_RE + PARAMS_RE + CODEPOINTS_RE + SCHEME_RE,
);

interface ParseBytesResult {
  prefix: string;
  unicodeCode?: string;
  shiftedCode?: string;
  baseLayoutCode?: string;
  params?: string;
  codepoints?: string;
  scheme: string;
  index: number;
  length: number;
}

function parseBytes(bytes: Uint8Array): ParseBytesResult | undefined {
  const match = decoder.decode(bytes).match(RE);
  if (match) {
    const [
      ,
      prefix,
      unicodeCode,
      shiftedCode,
      baseLayoutCode,
      params,
      codepoints,
      scheme,
    ] = match;

    return {
      prefix: prefix!,
      unicodeCode: unicodeCode!,
      shiftedCode,
      baseLayoutCode,
      params,
      codepoints,
      scheme: scheme!,
      index: match.index!,
      length: match[0].length,
    };
  }
}
