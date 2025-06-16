import { type Mods, parse_mods } from "./mods.ts";

export interface Key extends Mods {
  /**
   * Name of the key
   */
  name: string;
}

export function new_key(name: string, mods: Mods = {}): Key {
  return {
    name,
    ...mods,
  };
}

export function parse_key(code: string, mods?: string): Key {
  return new_key(csi_codes.get(code) ?? code, parse_mods(mods));
}

const csi_codes = new Map<string, string>([
  ["27u", "ESC"],
  ["13u", "ENTER"],
  ["9u", "TAB"],
  ["127u", "BACKSPACE"],
  ["2~", "INSERT"],
  ["3~", "DELETE"],
  ["D", "LEFT"],
  ["C", "RIGHT"],
  ["A", "UP"],
  ["B", "DOWN"],
  ["5~", "PAGE_UP"],
  ["6~", "PAGE_DOWN"],
  ["H", "HOME"],
  ["7~", "HOME"],
  ["F", "END"],
  ["8~", "END"],
  ["57358u", "CAPS_LOCK"],
  ["57359u", "SCROLL_LOCK"],
  ["57360u", "NUM_LOCK"],
  ["57361u", "PRINT_SCREEN"],
  ["57362u", "PAUSE"],
  ["57363u", "MENU"],
  ["P", "F1"],
  ["11~", "F1"],
  ["Q", "F2"],
  ["12~", "F2"],
  ["13~", "F3"],
  ["S", "F4"],
  ["14~", "F4"],
  ["15~", "F5"],
  ["17~", "F6"],
  ["18~", "F7"],
  ["19~", "F8"],
  ["20~", "F9"],
  ["21~", "F10"],
  ["23~", "F11"],
  ["24~", "F12"],
  ["57376u", "F13"],
]);
