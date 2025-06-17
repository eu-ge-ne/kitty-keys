import { type Modifiers, parse_modifiers } from "./modifiers.ts";

export interface UnicodeKeyEvent {
  key: string;
  shifted?: string;
  base?: string;
  modifiers: Modifiers;
  type: "press" | "repeat" | "release";
  text?: string;
}

export function is_unicode_key_event(buf: string): boolean {
  return buf.startsWith("\x1b[") && buf.endsWith("u");
}

export function parse_unicode_key_event(buf: string): UnicodeKeyEvent {
  const [key_codes = "", params = "", text_as_codepoints] = buf.slice(2, -1)
    .split(";");
  const [key_code, shifted_code, base_code] = key_codes!.split(":");
  const [mods, ev] = params!.split(":");

  const key = parse_code_points(key_code)!;
  const shifted = parse_code_points(shifted_code);
  const base = parse_code_points(base_code);
  const modifiers = parse_modifiers(mods);
  const type = ev === "3" ? "release" : ev === "2" ? "repeat" : "press";
  const text = parse_code_points(text_as_codepoints);

  return {
    key,
    shifted,
    base,
    modifiers,
    type,
    text,
  };
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
