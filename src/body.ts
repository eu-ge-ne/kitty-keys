import { type Modifiers, parse_modifiers } from "./modifiers.ts";

export interface Body extends Modifiers {
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
}

const BODY_RE = /[^\d:;]/;

export function parse_body(text: string): Body | undefined {
  text = text.slice(2, -1);
  if (BODY_RE.test(text)) {
    return;
  }

  const [codes, params = "", text_codepoints] = text.split(";");
  const [code, shifted_code, base_layout_code] = codes!.split(":");
  const [modifiers, event] = params!.split(":");

  const body: Body = {
    code: parse_number(code),
    shifted_code: parse_number(shifted_code),
    base_layout_code: parse_number(base_layout_code),
    ...parse_modifiers(modifiers),
    event: parse_event(event),
    text: parse_code_points(text_codepoints),
  };

  return body;
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
