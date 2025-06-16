import { Key } from "./key.ts";
import { type Mods, parse_mods } from "./mods.ts";

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
