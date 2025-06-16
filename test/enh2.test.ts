import { assertEquals } from "@std/assert";

import { type Key, new_key } from "../src/key.ts";
import { parse } from "../src/parse.ts";

const encoder = new TextEncoder();

function is(actual: string, expected: string | Key): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}

Deno.test("ESC", () => {
  is("\x1b[27u", new_key("ESC"));

  is("\x1b[27;5u", new_key("ESC", { ctrl: true }));
  is("\x1b[27;3u", new_key("ESC", { alt: true }));
  is("\x1b[27;2u", new_key("ESC", { shift: true }));
  is("\x1b[27;65u", new_key("ESC", { caps_lock: true }));
});
