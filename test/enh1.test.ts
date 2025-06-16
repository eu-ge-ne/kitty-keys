import { assertEquals } from "@std/assert";

import { type Key, new_key } from "../src/key.ts";
import { parse } from "../src/parse.ts";

const encoder = new TextEncoder();

function is(actual: string, expected: string | Key): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}

Deno.test("Functional keys", () => {
  is("\x1b[27u", new_key("ESC"));

  is("\x0d", "\r");
  is("\x1b[13u", new_key("ENTER"));

  is("\x09", "\t");
  is("\x1b[9u", new_key("TAB"));

  is("\x7f", "\x7f");
  is("\x08", "\x08");
  is("\x1b[127u", new_key("BACKSPACE"));

  is("\x1b[2~", new_key("INSERT"));

  is("\x1b[3~", new_key("DELETE"));

  is("\x1b[D", new_key("LEFT"));
  is("\x1b[C", new_key("RIGHT"));

  is("\x1b[A", new_key("UP"));
  is("\x1b[B", new_key("DOWN"));

  is("\x1b[5~", new_key("PAGE_UP"));
  is("\x1b[6~", new_key("PAGE_DOWN"));

  is("\x1b[H", new_key("HOME"));
  is("\x1b[7~", new_key("HOME"));

  is("\x1b[F", new_key("END"));
  is("\x1b[8~", new_key("END"));

  is("\x1b[P", new_key("F1"));
  is("\x1b[11~", new_key("F1"));

  is("\x1b[Q", new_key("F2"));
  is("\x1b[12~", new_key("F2"));

  is("\x1b[13~", new_key("F3"));

  is("\x1b[S", new_key("F4"));
  is("\x1b[14~", new_key("F4"));

  is("\x1b[15~", new_key("F5"));
  is("\x1b[17~", new_key("F6"));
  is("\x1b[18~", new_key("F7"));
  is("\x1b[19~", new_key("F8"));
  is("\x1b[20~", new_key("F9"));
  is("\x1b[21~", new_key("F10"));
  is("\x1b[23~", new_key("F11"));
  is("\x1b[24~", new_key("F12"));

  // TODO: F13 - ...
});
