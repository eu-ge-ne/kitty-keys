import { CharKey, FuncKey, type Key } from "./key.ts";
import { map } from "./map.ts";

// CSI number ; modifier ~
const csi_re = /(?<number>\d+)(;(?<modifier>.*))?~/s;
// CSI 1 ; modifier {ABCDEFHPQS}
const csi1_re = /(1;(?<modifier>.*))?(?<key>[ABCDEFHPQS])/s;
// SS3 {ABCDEFHPQRS}
const ss3_re = /(?<key>[ABCDEFHPQRS])/s;

const decoder = new TextDecoder();

/**
 * Parse key event from bytes
 */
export function parse(buf: Uint8Array): Key[] {
  const text = decoder.decode(buf);

  const mapped = map.get(text);
  if (mapped) {
    return mapped;
  }

  if (buf.length === 2 && buf[0] === 0x1b) {
    return [new CharKey(text.slice(1), { alt: true })];
  }

  if (text.startsWith("\x1b[")) {
    const csi = text.slice(2);

    const match0 = csi.match(csi_re);
    if (match0?.groups) {
      const { number, modifier } = match0.groups;
      return [FuncKey.parse(number!, modifier)];
    }

    const match1 = csi.match(csi1_re);
    if (match1?.groups) {
      const { modifier, key } = match1.groups;
      return [FuncKey.parse(key!, modifier)];
    }
  }

  if (text.startsWith("\x1bO")) {
    const ss3 = text.slice(2);

    const match = ss3.match(ss3_re);
    if (match?.groups) {
      const { key } = match.groups;
      return [FuncKey.parse(key!)];
    }
  }

  return [new CharKey(text)];
}
