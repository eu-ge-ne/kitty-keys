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

Deno.test("ESC", () => {
  eq("\x1b[27u", new Key("ESC"));
});

Deno.test("ENTER", () => {
  eq([0x0d], "\r");
  eq("\x1b[13u", new Key("ENTER"));
});

Deno.test("TAB", () => {
  eq([0x09], "\t");
  eq("\x1b[9u", new Key("TAB"));
});

Deno.test("BACKSPACE", () => {
  eq([0x7f], "\x7f");
  eq([0x08], "\x08");
  eq("\x1b[127u", new Key("BACKSPACE"));
});

Deno.test("INSERT", () => {
  eq("\x1b[2~", new Key("INSERT"));
});

Deno.test("DELETE", () => {
  eq("\x1b[3~", new Key("DELETE"));
});

Deno.test("LEFT", () => {
  eq("\x1b[D", new Key("LEFT"));
});

Deno.test("RIGHT", () => {
  eq("\x1b[C", new Key("RIGHT"));
});

Deno.test("UP", () => {
  eq("\x1b[A", new Key("UP"));
});

Deno.test("DOWN", () => {
  eq("\x1b[B", new Key("DOWN"));
});
