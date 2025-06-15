import { esc_code_name } from "./esc-codes.ts";

export abstract class Key {
  shift = false;
  alt = false;
  ctrl = false;
  super = false;
  hyper = false;
  meta = false;
  caps_lock = false;
  num_lock = false;

  constructor(modifiers?: string) {
    if (typeof modifiers === "string") {
      const n = Number.parseInt(modifiers, 10) - 1;

      this.shift = Boolean(n & 1);
      this.alt = Boolean(n & 2);
      this.ctrl = Boolean(n & 4);
      this.super = Boolean(n & 8);
      this.hyper = Boolean(n & 16);
      this.meta = Boolean(n & 32);
      this.caps_lock = Boolean(n & 64);
      this.num_lock = Boolean(n & 128);
    }
  }
}

export class CharKey extends Key {
  char: string;

  constructor(char: string, modifiers?: string) {
    super(modifiers);

    this.char = char;
  }
}

export class FuncKey extends Key {
  name: string;

  constructor(name: string, modifiers?: string) {
    super(modifiers);

    this.name = name;
  }

  static from_esc(esc_code: string, modifiers?: string): FuncKey {
    const name = esc_code_name(esc_code) ?? esc_code;

    return new FuncKey(name, modifiers);
  }
}
