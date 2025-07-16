import type { Prefix } from "./prefix.ts";
import type { Scheme } from "./scheme.ts";

const func_keys = new Map<string, string>([
  ["\x1b[27u", "ESC"],
  ["\x1b[13u", "ENTER"],
  ["\x1b[9u", "TAB"],
  ["\x1b[127u", "BACKSPACE"],
  ["\x1b[2~", "INSERT"],
  ["\x1b[3~", "DELETE"],
  ["\x1b[1D", "LEFT"],
  ["\x1b[1C", "RIGHT"],
  ["\x1b[1A", "UP"],
  ["\x1b[1B", "DOWN"],
  ["\x1b[5~", "PAGE_UP"],
  ["\x1b[6~", "PAGE_DOWN"],
  ["\x1b[1H", "HOME"],
  ["\x1b[7~", "HOME"],
  ["\x1b[1F", "END"],
  ["\x1b[8~", "END"],

  // TODO

  ["11~", "F1"],
  ["12~", "F2"],
  ["13~", "F3"],
  ["14~", "F4"],
  ["15~", "F5"],
  ["17~", "F6"],
  ["18~", "F7"],
  ["19~", "F8"],
  ["20~", "F9"],
  ["21~", "F10"],
  ["23~", "F11"],
  ["24~", "F12"],

  ["P", "F1"],
  ["Q", "F2"],
  ["S", "F4"],

  ["1P", "F1"],
  ["1Q", "F2"],
  ["1S", "F4"],

  ["\x1b[57358u", "CAPS_LOCK"],
  [String.fromCodePoint(57359), "SCROLL_LOCK"],
  [String.fromCodePoint(57360), "NUM_LOCK"],
  [String.fromCodePoint(57361), "PRINT_SCREEN"],
  [String.fromCodePoint(57362), "PAUSE"],
  [String.fromCodePoint(57363), "MENU"],
  [String.fromCodePoint(57441), "LEFT_SHIFT"],
  [String.fromCodePoint(57442), "LEFT_CONTROL"],
  [String.fromCodePoint(57443), "LEFT_ALT"],
  ["\x1b[57444u", "LEFT_SUPER"],
  [String.fromCodePoint(57445), "LEFT_HYPER"],
  [String.fromCodePoint(57446), "LEFT_META"],
  [String.fromCodePoint(57447), "RIGHT_SHIFT"],
  [String.fromCodePoint(57448), "RIGHT_CONTROL"],
  [String.fromCodePoint(57449), "RIGHT_ALT"],
  [String.fromCodePoint(57450), "RIGHT_SUPER"],
  [String.fromCodePoint(57451), "RIGHT_HYPER"],
  [String.fromCodePoint(57452), "RIGHT_META"],
  [String.fromCodePoint(57453), "ISO_LEVEL3_SHIFT"],
  [String.fromCodePoint(57454), "ISO_LEVEL5_SHIFT"],
]);

export function key_name(
  prefix: Prefix,
  code: number | undefined,
  scheme: Scheme,
): string {
  const name = `${prefix}${typeof code === "number" ? code : ""}${scheme}`;
  return func_keys.get(name) ?? name;
}
