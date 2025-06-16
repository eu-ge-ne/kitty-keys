import { type Mods, parse_mods } from "./mods.ts";

/**
 * Key event
 */
export class Key {
  /**
   * Name of the functional key
   */
  name: string;

  /**
   * Modifiers
   */
  mods: Mods;

  /**
   * Creates an instance of Key
   */
  constructor(name: string, mods: Mods = {}) {
    this.name = name;
    this.mods = mods;
  }

  /**
   * Creates an instance of FuncKey from escape codes
   */
  static parse(code: string, mods?: string): Key {
    return new Key(csi_codes.get(code) ?? code, parse_mods(mods));
  }
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
]);
