import { assertEquals } from "@std/assert";

import { parse } from "../src/parse.ts";
import { CharKey, FuncKey } from "../src/key.ts";

const encoder = new TextEncoder();

Deno.test("Characters", () => {
  assertEquals(parse(encoder.encode("a")), new CharKey("a"));
  assertEquals(parse(encoder.encode("A")), new CharKey("A"));
  assertEquals(parse(encoder.encode("0")), new CharKey("0"));
  assertEquals(parse(encoder.encode("$")), new CharKey("$"));
});

Deno.test("Func keys", () => {
  assertEquals(parse(new Uint8Array([0x1b])), new FuncKey("ESC"));
  assertEquals(parse(new Uint8Array([0xd])), new FuncKey("ENTER"));
  assertEquals(parse(new Uint8Array([0x9])), new FuncKey("TAB"));
  assertEquals(parse(new Uint8Array([0x7f])), new FuncKey("BACKSPACE"));

  assertEquals(parse(encoder.encode("\x1b[2~")), new FuncKey("INSERT"));
  assertEquals(parse(encoder.encode("\x1b[3~")), new FuncKey("DELETE"));
  assertEquals(parse(encoder.encode("\x1b[5~")), new FuncKey("PAGE_UP"));
  assertEquals(parse(encoder.encode("\x1b[6~")), new FuncKey("PAGE_DOWN"));

  assertEquals(parse(encoder.encode("\x1b[A")), new FuncKey("UP"));
  assertEquals(parse(encoder.encode("\x1bOA")), new FuncKey("UP"));
  assertEquals(parse(encoder.encode("\x1b[B")), new FuncKey("DOWN"));
  assertEquals(parse(encoder.encode("\x1bOB")), new FuncKey("DOWN"));
  assertEquals(parse(encoder.encode("\x1b[C")), new FuncKey("RIGHT"));
  assertEquals(parse(encoder.encode("\x1bOC")), new FuncKey("RIGHT"));
  assertEquals(parse(encoder.encode("\x1b[D")), new FuncKey("LEFT"));
  assertEquals(parse(encoder.encode("\x1bOD")), new FuncKey("LEFT"));
  assertEquals(parse(encoder.encode("\x1b[H")), new FuncKey("HOME"));
  assertEquals(parse(encoder.encode("\x1bOH")), new FuncKey("HOME"));
  assertEquals(parse(encoder.encode("\x1b[F")), new FuncKey("END"));
  assertEquals(parse(encoder.encode("\x1bOF")), new FuncKey("END"));

  assertEquals(parse(encoder.encode("\x1bOP")), new FuncKey("F1"));
  assertEquals(parse(encoder.encode("\x1bOQ")), new FuncKey("F2"));
  assertEquals(parse(encoder.encode("\x1bOR")), new FuncKey("F3"));
  assertEquals(parse(encoder.encode("\x1bOS")), new FuncKey("F4"));
  assertEquals(parse(encoder.encode("\x1b[15~")), new FuncKey("F5"));
  assertEquals(parse(encoder.encode("\x1b[17~")), new FuncKey("F6"));
  assertEquals(parse(encoder.encode("\x1b[18~")), new FuncKey("F7"));
  assertEquals(parse(encoder.encode("\x1b[19~")), new FuncKey("F8"));
  assertEquals(parse(encoder.encode("\x1b[20~")), new FuncKey("F9"));
  assertEquals(parse(encoder.encode("\x1b[21~")), new FuncKey("F10"));
  assertEquals(parse(encoder.encode("\x1b[23~")), new FuncKey("F11"));
  assertEquals(parse(encoder.encode("\x1b[24~")), new FuncKey("F12"));

  assertEquals(parse(encoder.encode("\x1b[29~")), new FuncKey("MENU"));
});
