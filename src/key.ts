import { esc_code_name } from "./esc.ts";
import { type Mods, parse_mods } from "./mods.ts";

/**
 * Key event
 */
export abstract class Key {
  mods: Mods;

  /**
   * Creates an instance of Key
   */
  constructor(mods: Mods = {}) {
    this.mods = mods;
  }
}

/**
 * Character key event
 */
export class CharKey extends Key {
  /**
   * Character
   */
  char: string;

  /**
   * Creates an instance of CharKey
   */
  constructor(char: string, mods?: Mods) {
    super(mods);

    this.char = char;
  }

  /**
   * Creates an instance of CharKey
   */
  static parse(char: string, mods?: string): CharKey {
    return new CharKey(char, parse_mods(mods));
  }
}

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
