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

  const keys: Key[] = [];

  if (text === "\x0d") {
    keys.push(new FuncKey("ENTER"));
    keys.push(new FuncKey("ENTER", { ctrl: true }));
    keys.push(new FuncKey("ENTER", { shift: true }));
    keys.push(new FuncKey("ENTER", { ctrl: true, shift: true }));
  }
  if (text === "\x1b\x0d") {
    keys.push(new FuncKey("ENTER", { alt: true }));
    keys.push(new FuncKey("ENTER", { alt: true, shift: true }));
    keys.push(new FuncKey("ENTER", { ctrl: true, alt: true }));
  }

  if (text === "\x1b") {
    keys.push(new FuncKey("ESC"));
    keys.push(new FuncKey("ESC", { ctrl: true }));
    keys.push(new FuncKey("ESC", { shift: true }));
    keys.push(new FuncKey("ESC", { ctrl: true, shift: true }));
  }
  if (text === "\x1b\x1b") {
    keys.push(new FuncKey("ESC", { alt: true }));
    keys.push(new FuncKey("ESC", { alt: true, shift: true }));
    keys.push(new FuncKey("ESC", { ctrl: true, alt: true }));
  }

  if (text === "\x7f") {
    keys.push(new FuncKey("BACKSPACE"));
    keys.push(new FuncKey("BACKSPACE", { shift: true }));
  }
  if (text === "\x08") {
    keys.push(new FuncKey("BACKSPACE", { ctrl: true }));
    keys.push(new FuncKey("BACKSPACE", { ctrl: true, shift: true }));
  }
  if (text === "\x1b\x7f") {
    keys.push(new FuncKey("BACKSPACE", { alt: true }));
    keys.push(new FuncKey("BACKSPACE", { alt: true, shift: true }));
  }
  if (text === "\x1b\x08") {
    keys.push(new FuncKey("BACKSPACE", { ctrl: true, alt: true }));
  }

  if (text === "\x09") {
    keys.push(new FuncKey("TAB"));
    keys.push(new FuncKey("TAB", { ctrl: true }));
  }
  if (text === "\x1b\x09") {
    keys.push(new FuncKey("TAB", { alt: true }));
    keys.push(new FuncKey("TAB", { ctrl: true, alt: true }));
  }
  if (text === "\x1b[Z") {
    keys.push(new FuncKey("TAB", { shift: true }));
    keys.push(new FuncKey("TAB", { ctrl: true, shift: true }));
  }
  if (text === "\x1b\x1b[Z") {
    keys.push(new FuncKey("TAB", { alt: true, shift: true }));
  }

  /*
  if (buf[0] === 0x20) {
    return new CharKey(" ", { shift: true });
  }
  if (buf[0] === 0x0) {
    return new CharKey(" ", { ctrl: true, shift: true });
  }
  if (buf[0] === 0x1b && buf[1] === 0x20) {
    return new CharKey(" ", { alt: true, shift: true });
  }
  if (buf[0] === 0x1b && buf[1] === 0x0) {
    return new CharKey(" ", { ctrl: true, alt: true });
  }

  if (buf[0] === 31) {
    return new CharKey("/", { ctrl: true });
  }

  if (buf[0] === 48) {
    return new CharKey("0", { ctrl: true });
  }

  if (buf[0] === 49) {
    return new CharKey("1", { ctrl: true });
  }

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

    return new CharKey(decoder.decode(buf.subarray(1)), { alt: true });
  }

  if (buf[0]! < 0x20 || buf[0]! === 0x7f) {
    return FuncKey.parse(decoder.decode(buf));
  }

  return new CharKey(decoder.decode(buf));
  */

  return keys;
}
