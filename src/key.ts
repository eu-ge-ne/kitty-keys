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
  ["27", "ESC"],
  ["13", "ENTER"],
  ["9", "TAB"],
  ["127", "BACKSPACE"],
  ["2", "INSERT"],
  ["3", "DELETE"],
  ["D", "LEFT"],
  ["C", "RIGHT"],
  ["A", "UP"],
  ["B", "DOWN"],
  ["5", "PAGE_UP"],
  ["6", "PAGE_DOWN"],
  ["H", "HOME"],
  ["7", "HOME"],
  ["F", "END"],
  ["8", "END"],
]);
