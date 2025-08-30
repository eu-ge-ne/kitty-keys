import { parseKitty } from "./kitty.ts";
import type { Modifiers } from "./modifiers.ts";
import { key_name } from "./name.ts";

/**
 * Represents key
 * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#an-overview}
 */
export class Key implements Modifiers {
  /**
   * Name of the key
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#functional-key-definitions}
   */
  name = "";

  /**
   * `unicode-key-code` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  code: number | undefined;

  /**
   * `shifted-key-code` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  shift_code: number | undefined;

  /**
   * `base-layout-key-code` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  base_code: number | undefined;

  /**
   * Text representation of the `event-type` sub-field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#event-types}
   */
  event: "press" | "repeat" | "release" = "press";

  /**
   * Text representation of the `text-as-codepoints` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#text-as-code-points}
   */
  text: string | undefined;

  shift = false;
  alt = false;
  ctrl = false;
  super = false;
  caps_lock = false;
  num_lock = false;

  static create(src0: Partial<Key>, src1?: Partial<Key>): Key {
    return Object.assign(new Key(), src0, src1);
  }

  static kitty(bytes: Uint8Array): [Key | undefined, number] {
    const x = parseKitty(bytes);
    if (!x) {
      return [undefined, 0];
    }

    const key = new Key();

    key.name = key_name(x.prefix, x.unicode_code, x.scheme);
    key.code = x.unicode_code;
    key.shift_code = x.shifted_code;
    key.base_code = x.base_layout_code;
    key.event = x.event;
    key.text = x.codepoints;
    Object.assign(key, x.modifiers);

    return [key, x.index + x.length];
  }
}
