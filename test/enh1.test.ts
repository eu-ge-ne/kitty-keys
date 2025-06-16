import { assertEquals } from "@std/assert";

import { Key } from "../src/key.ts";
import { parse } from "../src/parse.ts";

const encoder = new TextEncoder();

function eq(actual: string | number[], expected: string | Key): void {
  if (typeof actual === "string") {
    assertEquals(parse(encoder.encode(actual)), expected);
  } else {
    assertEquals(parse(new Uint8Array(actual)), expected);
  }
}

Deno.test("Keys", () => {
  eq("\x1b[27u", new Key("ESC"));

  eq([0x0d], "\r");
  eq("\x1b[13u", new Key("ENTER"));

  eq([0x09], "\t");
  eq("\x1b[9u", new Key("TAB"));

  eq([0x7f], "\x7f");
  eq([0x08], "\x08");
  eq("\x1b[127u", new Key("BACKSPACE"));

  eq("\x1b[2~", new Key("INSERT"));

  eq("\x1b[3~", new Key("DELETE"));

  eq("\x1b[D", new Key("LEFT"));

  eq("\x1b[C", new Key("RIGHT"));

  eq("\x1b[A", new Key("UP"));

  eq("\x1b[B", new Key("DOWN"));

  eq("\x1b[5~", new Key("PAGE_UP"));

  eq("\x1b[6~", new Key("PAGE_DOWN"));

  eq("\x1b[H", new Key("HOME"));
  eq("\x1b[7~", new Key("HOME"));

  eq("\x1b[F", new Key("END"));
  eq("\x1b[8~", new Key("END"));
});
