import type { KittyKey } from "./key.ts";
import { parse_modifiers } from "./modifiers.ts";
import { key_name } from "./name.ts";
import { parseBytes } from "./re.ts";

export function parse_kitty_key(
  bytes: Uint8Array,
): [KittyKey | undefined, number] {
  const x = parseBytes(bytes);
  if (!x) {
    return [undefined, 0];
  }

  const code = parse_number(x.unicode_code);

  const key: KittyKey = {
    name: key_name(x.prefix, code, x.scheme),
    ...parse_modifiers(x.modifiers),
  };

  if (typeof code === "number") {
    key.code = code;
  }

  const shifted_code = parse_number(x.shifted_code);
  if (typeof shifted_code === "number") {
    key.shifted_code = shifted_code;
  }

  const base_layout_code = parse_number(x.base_layout_code);
  if (typeof base_layout_code === "number") {
    key.base_layout_code = base_layout_code;
  }

  const event = parse_event(x.event);
  if (typeof event === "string") {
    key.event = event;
  }

  const text = parse_code_points(x.codepoints);
  if (typeof text === "string") {
    key.text = text;
  }

  return [key, x.index + x.length];
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
