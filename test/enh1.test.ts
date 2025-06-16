import { assertEquals } from "@std/assert";

import { Key } from "../src/key.ts";
import { parse } from "../src/parse.ts";

const encoder = new TextEncoder();

function is(actual: string, expected: string | Key): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}

Deno.test("Functional keys", () => {
  is("\x1b[27u", new Key("ESC"));

  is("\x0d", "\r");
  is("\x1b[13u", new Key("ENTER"));

  is("\x09", "\t");
  is("\x1b[9u", new Key("TAB"));

  is("\x7f", "\x7f");
  is("\x08", "\x08");
  is("\x1b[127u", new Key("BACKSPACE"));

  is("\x1b[2~", new Key("INSERT"));

  is("\x1b[3~", new Key("DELETE"));

  is("\x1b[D", new Key("LEFT"));
  is("\x1b[C", new Key("RIGHT"));

  is("\x1b[A", new Key("UP"));
  is("\x1b[B", new Key("DOWN"));

  is("\x1b[5~", new Key("PAGE_UP"));
  is("\x1b[6~", new Key("PAGE_DOWN"));

  is("\x1b[H", new Key("HOME"));
  is("\x1b[7~", new Key("HOME"));

  is("\x1b[F", new Key("END"));
  is("\x1b[8~", new Key("END"));

  is("\x1b[P", new Key("F1"));
  is("\x1b[11~", new Key("F1"));

  is("\x1b[Q", new Key("F2"));
  is("\x1b[12~", new Key("F2"));

  is("\x1b[13~", new Key("F3"));

  is("\x1b[S", new Key("F4"));
  is("\x1b[14~", new Key("F4"));

  is("\x1b[15~", new Key("F5"));
  is("\x1b[17~", new Key("F6"));
  is("\x1b[18~", new Key("F7"));
  is("\x1b[19~", new Key("F8"));
  is("\x1b[20~", new Key("F9"));
  is("\x1b[21~", new Key("F10"));
  is("\x1b[23~", new Key("F11"));
  is("\x1b[24~", new Key("F12"));

  // TODO: F13 - ...
});
