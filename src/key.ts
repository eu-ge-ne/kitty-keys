import { decoder } from "./codec.ts";
import { type Modifiers, parse_modifiers } from "./modifiers.ts";
import { key_name } from "./name.ts";

/**
 * Represents key
 * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#an-overview}
 */
export interface Key extends Modifiers {
  /**
   * `unicode-key-code` field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  code: number | undefined;

  /**
   * `shifted-key-code` field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  shifted_code: number | undefined;

  /**
   * `base-layout-key-code` field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  base_layout_code: number | undefined;

  /**
   * Text representation of the `event-type` sub-field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#event-types}
   */
  event: "press" | "repeat" | "release";

  /**
   * Text representation of the `text-as-codepoints` field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#text-as-code-points}
   */
  text: string | undefined;

  /**
   * Name of the key.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#functional-key-definitions}
   */
  name: string;
}

// deno-lint-ignore no-control-regex
const PREFIX_RE = /(?:\x1b\[)|(?:\x1bO)/;
const BODY_RE = /[^\d:;]/;
const SCHEME_RE = /[u~ABCDEFHPQS]/;

/**
 * Parses key event from bytes
 * @param bytes
 * @returns object of {@link Key} type
 * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#an-overview}
 */
export function parse_key(bytes: Uint8Array): Key | undefined {
  let text = decoder.decode(bytes);

  const prefix = parse_prefix(text);
  if (!prefix) {
    return;
  }

  const scheme = parse_scheme(text);
  if (!scheme) {
    return;
  }

  text = text.slice(2, -1);
  if (BODY_RE.test(text)) {
    return;
  }

  const [codes, params = "", text_codepoints] = text.split(";");
  const [raw_code, shifted_code, base_layout_code] = codes!.split(":");
  const [modifiers, event] = params!.split(":");

  const code = parse_number(raw_code);

  const key: Key = {
    name: key_name(prefix, code, scheme),

    code,
    shifted_code: parse_number(shifted_code),
    base_layout_code: parse_number(base_layout_code),
    event: parse_event(event),
    text: parse_code_points(text_codepoints),

    ...parse_modifiers(modifiers),
  };

  return key;
}

function parse_prefix(text: string): string | undefined {
  const prefix = text.slice(0, 2);

  if (PREFIX_RE.test(prefix)) {
    return prefix;
  }
}

export function parse_scheme(text: string): string | undefined {
  const scheme = text.at(-1) ?? "";

  if (SCHEME_RE.test(scheme)) {
    return scheme;
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

function parse_event(event?: string): "press" | "repeat" | "release" {
  return event === "3" ? "release" : event === "2" ? "repeat" : "press";
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
