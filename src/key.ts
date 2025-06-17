import { type Modifiers, parse_modifiers } from "./modifiers.ts";

export interface KeyEvent extends Modifiers {
  key: string;
  type: "press" | "repeat" | "release";
  shift_key?: string;
  base_key?: string;
  text?: string;
}

export function parse_key_event(buf: string): KeyEvent | undefined {
  if (!buf.startsWith("\x1b[")) {
    return;
  }

  const mode = buf.at(-1) ?? "";
  if (!/[u~ABCDEFHPQS]/.test(mode)) {
    return;
  }

  const [key_codes = "", params = "", text_as_codepoints] = buf.slice(2, -1)
    .split(";");
  const [key_code = "", shift_code, base_code] = key_codes!.split(":");
  const [mods, ev] = params!.split(":");

  const key = mode === "u" ? parse_code_points(key_code)! : key_code + mode;

  const result: KeyEvent = {
    key,
    type: ev === "3" ? "release" : ev === "2" ? "repeat" : "press",
    ...parse_modifiers(mods),
  };

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
