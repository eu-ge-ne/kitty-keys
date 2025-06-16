import { CharKey, FuncKey, type Key } from "./key.ts";

// CSI number ; modifier ~
const legacy_csi_re = /(?<number>\d+)(;(?<modifier>.*))?~/s;
// CSI 1 ; modifier {ABCDEFHPQS}
const legacy_csi1_re = /(1;(?<modifier>.*))?(?<key>[ABCDEFHPQS])/s;
// SS3 {ABCDEFHPQRS}
const legacy_ss3_re = /(?<key>[ABCDEFHPQRS])/s;

const decoder = new TextDecoder();

/**
 * Parse key event from bytes
 */
export function parse(buf: Uint8Array): Key[] {
  const text = decoder.decode(buf);

  if (text === "\x0d") {
    return [
      new FuncKey("ENTER"),
      new FuncKey("ENTER", { ctrl: true }),
      new FuncKey("ENTER", { shift: true }),
      new FuncKey("ENTER", { ctrl: true, shift: true }),
    ];
  }
  if (text === "\x1b\x0d") {
    return [
      new FuncKey("ENTER", { alt: true }),
      new FuncKey("ENTER", { alt: true, shift: true }),
      new FuncKey("ENTER", { ctrl: true, alt: true }),
    ];
  }

  if (text === "\x1b") {
    return [
      new FuncKey("ESC"),
      new FuncKey("ESC", { ctrl: true }),
      new FuncKey("ESC", { shift: true }),
      new FuncKey("ESC", { ctrl: true, shift: true }),
    ];
  }
  if (text === "\x1b\x1b") {
    return [
      new FuncKey("ESC", { alt: true }),
      new FuncKey("ESC", { alt: true, shift: true }),
      new FuncKey("ESC", { ctrl: true, alt: true }),
    ];
  }

  if (text === "\x7f") {
    return [
      new FuncKey("BACKSPACE"),
      new FuncKey("BACKSPACE", { shift: true }),
    ];
  }
  if (text === "\x08") {
    return [
      new FuncKey("BACKSPACE", { ctrl: true }),
      new FuncKey("BACKSPACE", { ctrl: true, shift: true }),
    ];
  }
  if (text === "\x1b\x7f") {
    return [
      new FuncKey("BACKSPACE", { alt: true }),
      new FuncKey("BACKSPACE", { alt: true, shift: true }),
    ];
  }
  if (text === "\x1b\x08") {
    return [new FuncKey("BACKSPACE", { ctrl: true, alt: true })];
  }

  if (text === "\x09") {
    return [
      new FuncKey("TAB"),
      new FuncKey("TAB", { ctrl: true }),
    ];
  }
  if (text === "\x1b\x09") {
    return [
      new FuncKey("TAB", { alt: true }),
      new FuncKey("TAB", { ctrl: true, alt: true }),
    ];
  }
  if (text === "\x1b[Z") {
    return [
      new FuncKey("TAB", { shift: true }),
      new FuncKey("TAB", { ctrl: true, shift: true }),
    ];
  }
  if (text === "\x1b\x1b[Z") {
    return [new FuncKey("TAB", { alt: true, shift: true })];
  }

  if (text === "\x20") {
    return [
      new CharKey(" "),
      new CharKey(" ", { shift: true }),
    ];
  }
  if (text === "\x00") {
    return [
      new CharKey("2", { ctrl: true }),
      new CharKey(" ", { ctrl: true }),
      new CharKey(" ", { ctrl: true, shift: true }),
    ];
  }
  if (text === "\x1b\x20") {
    return [
      new CharKey(" ", { alt: true }),
      new CharKey(" ", { alt: true, shift: true }),
    ];
  }
  if (text === "\x1b\x00") {
    return [new CharKey(" ", { ctrl: true, alt: true })];
  }

  if (buf.length === 2 && buf[0] === 0x1b) {
    return [new CharKey(decoder.decode(buf.subarray(1)), { alt: true })];
  }

  if (text === "\x1f") {
    return [new CharKey("/", { ctrl: true })];
  }

  if (text === "0") {
    return [
      new CharKey("0"),
      new CharKey("0", { ctrl: true }),
    ];
  }

  if (text === "1") {
    return [
      new CharKey("1"),
      new CharKey("1", { ctrl: true }),
    ];
  }

  /*
  if (buf[0] === 0x1b) {
    if (buf[1] === 0x5b) {
      const csi = decoder.decode(buf.subarray(2));

      if (csi === "Z") {
        return new FuncKey("TAB", { ctrl: true, shift: true });
      }

      const match = csi.match(legacy_csi_re);
      if (match?.groups) {
        const { number, modifier } = match.groups;
        return FuncKey.parse(number!, modifier);
      }

      const match1 = csi.match(legacy_csi1_re);
      if (match1?.groups) {
        const { modifier, key } = match1.groups;
        return FuncKey.parse(key!, modifier);
      }
    }

    if (buf[1] === 0x4f) {
      const ss3 = decoder.decode(buf.subarray(2));

      const match = ss3.match(legacy_ss3_re);
      if (match?.groups) {
        const { key } = match.groups;
        return FuncKey.parse(key!);
      }
    }

  }

  if (buf[0]! < 0x20 || buf[0]! === 0x7f) {
    return FuncKey.parse(decoder.decode(buf));
  }

  return new CharKey(decoder.decode(buf));
  */

  return [];
}
