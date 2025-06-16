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

/*
Deno.test("Func keys", () => {
  eq("\x1b[5~", new FuncKey("PAGE_UP"));
  eq("\x1b[6~", new FuncKey("PAGE_DOWN"));
  eq("\x1b[A", new FuncKey("UP"));
  eq("\x1bOA", new FuncKey("UP"));
  eq("\x1b[B", new FuncKey("DOWN"));
  eq("\x1bOB", new FuncKey("DOWN"));
  eq("\x1b[C", new FuncKey("RIGHT"));
  eq("\x1bOC", new FuncKey("RIGHT"));
  eq("\x1b[D", new FuncKey("LEFT"));
  eq("\x1bOD", new FuncKey("LEFT"));
  eq("\x1b[H", new FuncKey("HOME"));
  eq("\x1bOH", new FuncKey("HOME"));
  eq("\x1b[F", new FuncKey("END"));
  eq("\x1bOF", new FuncKey("END"));
  eq("\x1bOP", new FuncKey("F1"));
  eq("\x1b[24~", new FuncKey("F12"));
  eq("\x1b[29~", new FuncKey("MENU"));
});
*/
