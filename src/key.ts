import { decoder } from "./codec.ts";
import { type Modifiers, parse_modifiers } from "./modifiers.ts";
import { key_name } from "./name.ts";

/**
 * Represents key
 * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#an-overview}
 */
export interface KittyKey extends Modifiers {
  /**
   * Name of the key
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#functional-key-definitions}
   */
  name: string;

  /**
   * `unicode-key-code` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  code?: number;

  /**
   * `shifted-key-code` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  shifted_code?: number;

  /**
   * `base-layout-key-code` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  base_layout_code?: number;

  /**
   * Text representation of the `event-type` sub-field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#event-types}
   */
  event?: "press" | "repeat" | "release";

  /**
   * Text representation of the `text-as-codepoints` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#text-as-code-points}
   */
  text?: string;
}

// deno-lint-ignore no-control-regex
const RE = /(\x1b\x5b|\x1b\x4f)([\d:;]+)?([u~ABCDEFHPQS])/;

export function parse_kitty_key(
  bytes: Uint8Array,
): [KittyKey, number] | undefined {
  const match = decoder.decode(bytes).match(RE);
  if (!match) {
    return;
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
