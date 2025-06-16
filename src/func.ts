import { Key } from "./key.ts";
import { type Mods, parse_mods } from "./mods.ts";

/**
 * Functional key event
 */
export class FuncKey extends Key {
  /**
   * Name of the functional key
   */
  name: string;

  /**
   * Creates an instance of FuncKey
   */
  constructor(name: string, mods?: Mods) {
    super(mods);

    this.name = name;
  }

  /**
   * Creates an instance of FuncKey from escape codes
   */
  static parse(esc_code: string, mods?: string): FuncKey {
    return new FuncKey(esc_code_name(esc_code) ?? esc_code, parse_mods(mods));
  }
}

function esc_code_name(esc_code: string): string {
  return esc_codes.get(esc_code) ?? esc_code;
}

const esc_codes = new Map<string, string>([
  ["2", "INSERT"],
  ["3", "DELETE"],
  ["5", "PAGE_UP"],
  ["6", "PAGE_DOWN"],
  ["A", "UP"],
  ["B", "DOWN"],
  ["C", "RIGHT"],
  ["D", "LEFT"],
  ["H", "HOME"],
  ["F", "END"],
  ["P", "F1"],
  ["Q", "F2"],
  ["R", "F3"],
  ["S", "F4"],
  ["15", "F5"],
  ["17", "F6"],
  ["18", "F7"],
  ["19", "F8"],
  ["20", "F9"],
  ["21", "F10"],
  ["23", "F11"],
  ["24", "F12"],
  ["29", "MENU"],
]);
