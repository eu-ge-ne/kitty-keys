import { type Key, parse_key } from "./key.ts";

// CSI number; modifier: event u
const csi0_re =
  /(?<number>\d+)(;(?<modifier>.*):(?<event>\d+)?)?(?<suffix>[u~])/s;

// CSI 1; modifier [~ABCDEFHPQS]
const csi1_re = /(1;(?<modifier>.*):(?<event>\d+)?)?(?<key>[ABCDEFHPQS])/s;

const decoder = new TextDecoder();

/**
 * Parse key event from bytes
 */
export function parse(buf: Uint8Array): string | Key {
  const text = decoder.decode(buf);

  if (text.startsWith("\x1b[")) {
    const csi = text.slice(2);

    const match0 = csi.match(csi0_re);
    if (match0?.groups) {
      const { number, modifier, event, suffix } = match0.groups;
      return parse_key(number! + suffix!, modifier, event);
    }

    const match1 = csi.match(csi1_re);
    if (match1?.groups) {
      const { modifier, event, key } = match1.groups;
      return parse_key(key!, modifier, event);
    }
  }

  return text;
}
