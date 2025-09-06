import { func_names } from "./func.ts";
import { parse_number } from "./num.ts";

const PREFIX_RE = String.raw`(\x1b\x5b|\x1b\x4f)`;
const CODES_RE = String.raw`(?:(\d+)(?::(\d*))?(?::(\d*))?)?`;
const PARAMS_RE = String.raw`(?:;(\d*)?(?::(\d*))?)?`;
const CODEPOINTS_RE = String.raw`(?:;([\d:]*))?`;
const SCHEME_RE = String.raw`([u~ABCDEFHPQS])`;

const RE = new RegExp(
  PREFIX_RE + CODES_RE + PARAMS_RE + CODEPOINTS_RE + SCHEME_RE,
);

const decoder: TextDecoder = new TextDecoder();

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

  static parse_kitty(bytes: Uint8Array): [Key, number] | undefined {
    const match = decoder.decode(bytes).match(RE);
    if (!match) {
      return;
    }

    const key = new Key();

    key.parse_name(match[1]!, match[2], match[8]!);
    key.parse_codes(match[2], match[3], match[4]);

    let flags = 0;
    if (match[5]) {
      flags = Number.parseInt(match[5]);
      if (Number.isSafeInteger(flags)) {
        flags -= 1;
      }
    }

    key.shift = Boolean(flags & 1);
    key.alt = Boolean(flags & 2);
    key.ctrl = Boolean(flags & 4);
    key.super = Boolean(flags & 8);
    key.caps_lock = Boolean(flags & 64);
    key.num_lock = Boolean(flags & 128);

    switch (match[6]) {
      case "1":
        key.event = "press";
        break;
      case "2":
        key.event = "repeat";
        break;
      case "3":
        key.event = "release";
        break;
      default:
        key.event = "press";
        break;
    }

    if (match[7]) {
      key.text = String.fromCodePoint(
        ...match[7].split(":").map((x) => Number.parseInt(x)).filter((x) =>
          Number.isSafeInteger(x)
        ),
      );
    }

    return [key, match.index! + match[0].length];
  }

  parse_name(
    prefix: string,
    code: string | undefined,
    scheme: string,
  ): void {
    const func_name = func_names.get(`${prefix}${code ?? ""}${scheme}`);
    if (typeof func_name === "string") {
      this.name = func_name;
      return;
    }

    const c = parse_number(code);
    if (typeof c === "number") {
      this.name = String.fromCodePoint(c);
      return;
    }

    this.name = `${prefix}${scheme}`;
  }

  parse_codes(
    code: string | undefined,
    shift_code: string | undefined,
    base_code: string | undefined,
  ): void {
    this.code = parse_number(code);
    this.shift_code = parse_number(shift_code);
    this.base_code = parse_number(base_code);
  }
}
