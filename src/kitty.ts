import { decoder } from "./codec.ts";
import { parse_modifiers } from "./modifiers.ts";
import { key_name } from "./name.ts";

import type { KittyKey } from "./key.ts";

// deno-lint-ignore no-control-regex
const RE = /(\x1b\x5b|\x1b\x4f)([\d:;]+)?([u~ABCDEFHPQS])/;

export function parse_kitty_key(
  bytes: Uint8Array,
): [KittyKey | undefined, number] {
  const match = decoder.decode(bytes).match(RE);
  if (!match) {
    return [undefined, 0];
  }

  const [, prefix, body = "", scheme] = match;

  const [codes = "", params = "", text_codepoints = ""] = body.split(";");
  const [code0, code1, code2] = codes.split(":");
  const [modifiers, raw_event] = params.split(":");

  const code = parse_number(code0);

  const key: KittyKey = {
    name: key_name(prefix!, code, scheme!),
    ...parse_modifiers(modifiers),
  };

  if (typeof code === "number") {
    key.code = code;
  }

  const shifted_code = parse_number(code1);
  if (typeof shifted_code === "number") {
    key.shifted_code = shifted_code;
  }

  const base_layout_code = parse_number(code2);
  if (typeof base_layout_code === "number") {
    key.base_layout_code = base_layout_code;
  }

  const event = parse_event(raw_event);
  if (typeof event === "string") {
    key.event = event;
  }

  const text = parse_code_points(text_codepoints);
  if (typeof text === "string") {
    key.text = text;
  }

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
