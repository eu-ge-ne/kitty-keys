import { decoder } from "./codec.ts";

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
  unicode_code?: string;
  shifted_code?: string;
  base_layout_code?: string;
  modifiers?: string;
  event?: string;
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
      unicode_code,
      shifted_code,
      base_layout_code,
      modifiers,
      event,
      codepoints,
      scheme: scheme!,
      index: match.index!,
      length: match[0].length,
    };
  }
}
