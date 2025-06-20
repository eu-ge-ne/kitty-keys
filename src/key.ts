import { decoder } from "./codec.ts";
import { func_keys } from "./const.ts";
import { type Modifiers, parse_modifiers } from "./modifiers.ts";

/**
 * Represents key event.
 * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#an-overview}
 */
export interface Key extends Modifiers {
  /**
   * Text representation of the `unicode-key-code` field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  key: string;

  /**
   * Text representation of the `event-type` sub-field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#event-types}
   */
  event: "press" | "repeat" | "release";

  /**
   * Text representation of the `shifted-key-code` field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  shift_key?: string;

  /**
   * Text representation of the `base-layout-key-code` field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  base_key?: string;

  /**
   * Text representation of the `text-as-codepoints` field.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#text-as-code-points}
   */
  text?: string;

  /**
   * Name of the functional key.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#functional-key-definitions}
   */
  name?: string;
}

/**
 * Parses key event from bytes.
 * @param bytes
 * @returns object of {@link Key} type
 * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#an-overview}
 */
export function parse_key(bytes: Uint8Array): Key | undefined {
  let text = decoder.decode(bytes);

  if (!text.startsWith("\x1b[")) {
    return;
  }

  const mode = text.at(-1)!;
  if (!/[u~ABCDEFHPQS]/.test(text)) {
    return;
  }

  text = text.slice(2, -1);
  if (/[^\d:;]/.test(text)) {
    return;
  }

  const [key_codes = "", params = "", text_as_codepoints] = text.split(";");
  const [key_code = "", shift_code, base_code] = key_codes!.split(":");
  const [mods, ev] = params!.split(":");

  const key = mode === "u" ? parse_code_points(key_code)! : key_code + mode;
  const event = ev === "3" ? "release" : ev === "2" ? "repeat" : "press";

  const result: Key = {
    key,
    event,
    ...parse_modifiers(mods),
  };

  const name = func_keys.get(key);
  if (typeof name === "string") {
    result.name = name;
  }

  if (mode === "u") {
    const shift_key = parse_code_points(shift_code);
    if (typeof shift_key === "string") {
      result.shift_key = shift_key;
    }

    const base_key = parse_code_points(base_code);
    if (typeof base_key === "string") {
      result.base_key = base_key;
    }

    const text = parse_code_points(text_as_codepoints);
    if (typeof text === "string") {
      result.text = text;
    }
  }

  return result;
}

function parse_code_points(
  code_points: string | undefined,
): string | undefined {
  if (code_points) {
    return String.fromCodePoint(
      ...code_points.split(":").map((x) => Number.parseInt(x, 10)).filter((x) =>
        Number.isSafeInteger(x)
      ),
    );
  }
}
