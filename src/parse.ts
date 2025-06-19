import { func_keys } from "./const.ts";
import type { Key, Modifiers } from "./key.ts";

const decoder = new TextDecoder();

/**
 * Parse key event from bytes
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

function parse_modifiers(mods?: string): Modifiers {
  const result: Modifiers = {};

  if (typeof mods === "string") {
    const n = Number.parseInt(mods, 10) - 1;

    if (n & 1) {
      result.shift = true;
    }

    if (n & 2) {
      result.alt = true;
    }

    if (n & 4) {
      result.ctrl = true;
    }

    if (n & 8) {
      result.super = true;
    }

    if (n & 16) {
      result.hyper = true;
    }

    if (n & 32) {
      result.meta = true;
    }

    if (n & 64) {
      result.caps_lock = true;
    }

    if (n & 128) {
      result.num_lock = true;
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
