import { CharKey, type Key } from "./key.ts";
import { map } from "./map.ts";

// CSI number ; modifier ~
const _legacy_csi_re = /(?<number>\d+)(;(?<modifier>.*))?~/s;
// CSI 1 ; modifier {ABCDEFHPQS}
const _legacy_csi1_re = /(1;(?<modifier>.*))?(?<key>[ABCDEFHPQS])/s;
// SS3 {ABCDEFHPQRS}
const _legacy_ss3_re = /(?<key>[ABCDEFHPQRS])/s;

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
    return [new CharKey(decoder.decode(buf.subarray(1)), { alt: true })];
  }

  /*
  if (buf[0] === 0x1b) {
    if (buf[1] === 0x5b) {
      const csi = decoder.decode(buf.subarray(2));

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
