/**
 * Represents key
 * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#an-overview}
 */
export class Key {
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

  /**
   * SHIFT
   */
  shift = false;

  /**
   * ALT/OPTION
   */
  alt = false;

  /**
   * CONTROL
   */
  ctrl = false;

  /**
   * SUPER/COMMAND
   */
  super = false;

  /**
   * CAPS LOCK
   */
  caps_lock = false;

  /**
   * NUM LOCK
   */
  num_lock = false;

  parse_event(event?: string): void {
    switch (event) {
      case "1":
        this.event = "press";
        break;
      case "2":
        this.event = "repeat";
        break;
      case "3":
        this.event = "release";
        break;
      default:
        this.event = "press";
        break;
    }
  }

  parse_modifiers(text: string | undefined): void {
    let flags = 0;

    if (text) {
      flags = Number.parseInt(text);

      if (Number.isSafeInteger(flags)) {
        flags -= 1;
      }
    }

    this.shift = Boolean(flags & 1);
    this.alt = Boolean(flags & 2);
    this.ctrl = Boolean(flags & 4);
    this.super = Boolean(flags & 8);
    this.caps_lock = Boolean(flags & 64);
    this.num_lock = Boolean(flags & 128);
  }
}
