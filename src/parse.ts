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

        if (csi === "Z") {
          return new FuncKey("TAB", { shift: true });
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
    }

    if (buf[0] === 0x1b) {
      if (buf[1] === 0x4f) {
        const ss3 = decoder.decode(buf.subarray(2));

        const match = ss3.match(legacy_ss3_re);
        if (match?.groups) {
          const { key } = match.groups;
          return FuncKey.parse(key!);
        }
      }
    }

    if (buf[0] === 0xd) {
      return new FuncKey("ENTER");
    }
    if (buf[0] === 0x1b && buf[1] === 0xd) {
      return new FuncKey("ENTER", { alt: true });
    }

    if (buf[0] === 0x1b) {
      if (buf[1] === 0x1b) {
        return new FuncKey("ESC", { alt: true });
      } else if (typeof buf[1] === "undefined") {
        return new FuncKey("ESC");
      }
    }

    if (buf[0] === 0x7f) {
      return new FuncKey("BACKSPACE");
    }
    if (buf[0] === 0x8) {
      return new FuncKey("BACKSPACE", { ctrl: true });
    }
    if (buf[0] === 0x1b && buf[1] === 0x7f) {
      return new FuncKey("BACKSPACE", { alt: true });
    }

    if (buf[0] === 0x9) {
      return new FuncKey("TAB");
    }
    if (buf[0] === 0x1b && buf[1] === 0x9) {
      return new FuncKey("TAB", { alt: true });
    }

    if (buf[0] === 0x20) {
      return new CharKey(" ");
    }
    if (buf[0] === 0x0) {
      return new CharKey(" ", { ctrl: true });
    }
    if (buf[0] === 0x1b && buf[1] === 0x20) {
      return new CharKey(" ", { alt: true });
    }

    if (buf[0]! < 0x20 || buf[0]! === 0x7f) {
      return FuncKey.parse(decoder.decode(buf));
    }

    return new CharKey(decoder.decode(buf));
  }
}
