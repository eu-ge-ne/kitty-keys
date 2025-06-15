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
export function parse(buf: Uint8Array): Key | undefined {
  if (buf.length > 0) {
    if (buf[0] === 0x1b) {
      if (buf[1] === 0x5b) {
        const csi = decoder.decode(buf.subarray(2));

        const match = csi.match(legacy_csi_re);
        if (match?.groups) {
          const { number, modifier } = match.groups;
          return FuncKey.from_esc(number!, modifier);
        }

        const match1 = csi.match(legacy_csi1_re);
        if (match1?.groups) {
          const { modifier, key } = match1.groups;
          return FuncKey.from_esc(key!, modifier);
        }
      }
    }

    if (buf[0] === 0x1b) {
      if (buf[1] === 0x4f) {
        const ss3 = decoder.decode(buf.subarray(2));

        const match = ss3.match(legacy_ss3_re);
        if (match?.groups) {
          const { key } = match.groups;
          return FuncKey.from_esc(key!);
        }
      }
    }

    if (buf[0]! < 0x20 || buf[0]! === 0x7f) {
      return FuncKey.from_esc(decoder.decode(buf));
    }

    return new CharKey(decoder.decode(buf));
  }
}
