import { decoder } from "./codec.ts";
import { type Key, parse_key } from "./key.ts";

/**
 * Parses keys from bytes
 * @param bytes
 * @yields {@link Key} or string
 */
export function* parse_keys(bytes: Uint8Array): Generator<Key | string> {
  for (let i = 0; i < bytes.length;) {
    const b = bytes[i];

    if ((i === bytes.length - 1) && b === 0x1b) {
      yield { name: "ESC" };
      i += 1;
      continue;
    }

    if (b === 0x0d) {
      yield { name: "ENTER" };
      i += 1;
      continue;
    }

    if (b === 0x09) {
      yield { name: "TAB" };
      i += 1;
      continue;
    }

    if (b === 0x7f || b === 0x08) {
      yield { name: "BACKSPACE" };
      i += 1;
      continue;
    }

    if (b !== 0x1b) {
      let end = bytes.indexOf(0x1b, i + 1);
      if (end < 0) {
        end = bytes.length;
      }

      yield decoder.decode(bytes.subarray(i, end));
      i = end;
      continue;
    }

    const parsed = parse_key(bytes.subarray(i));
    if (parsed) {
      yield parsed[0];
      i += parsed[1];
      continue;
    }

    // TODO: find the beginning of next packet
    let end = bytes.indexOf(0x1b, i + 1);
    if (end < 0) {
      end = bytes.length;
    }
    i = end;
  }
}
