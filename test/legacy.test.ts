import { assertEquals, assertInstanceOf } from "@std/assert";

import { parse } from "../src/parse.ts";
import { CharKey, FuncKey } from "../src/key.ts";

const encoder = new TextEncoder();

Deno.test("Any char", () => {
  const k0 = parse(encoder.encode("a"));
  assertInstanceOf(k0, CharKey);
  assertEquals(k0.char, "a");

  assertEquals(parse(encoder.encode("A")), new CharKey("A"));
  assertEquals(parse(encoder.encode("0")), new CharKey("0"));
  assertEquals(parse(encoder.encode("$")), new CharKey("$"));
});

Deno.test("Always legacy func", () => {
  const k0 = parse(new Uint8Array([0xd]));
  assertInstanceOf(k0, FuncKey);
  assertEquals(k0.name, "ENTER");

  assertEquals(parse(new Uint8Array([0x9])), new FuncKey("TAB"));
  assertEquals(parse(new Uint8Array([0x7f])), new FuncKey("DEL"));
});

Deno.test("SS3 {ABCDEFHPQRS}", () => {
  const k0 = parse(new Uint8Array([0x1b, 0x4f, 0x41]));
  assertInstanceOf(k0, FuncKey);
  assertEquals(k0.name, "UP");

  assertEquals(parse(new Uint8Array([0x1b, 0x4f, 0x53])), new FuncKey("S"));
});

Deno.test("CSI 1 ; modifier {ABCDEFHPQS}", () => {
  const k0 = parse(encoder.encode("\x1b[A"));
  assertInstanceOf(k0, FuncKey);
  assertEquals(k0.name, "UP");

  assertEquals(parse(encoder.encode("\x1b[1;1A")), new FuncKey("UP", "1"));
  assertEquals(parse(encoder.encode("\x1b[S")), new FuncKey("S"));
  assertEquals(parse(encoder.encode("\x1b[1;1S")), new FuncKey("S", "1"));
});

Deno.test("CSI number ; modifier ~", () => {
  const k0 = parse(encoder.encode("\x1b[2~"));
  assertInstanceOf(k0, FuncKey);
  assertEquals(k0.name, "INSERT");

  assertEquals(parse(encoder.encode("\x1b[21~")), new FuncKey("F10"));
});
