import { assertEquals } from "@std/assert";

import { parse } from "../src/parse.ts";
import { CharKey, FuncKey, type Key } from "../src/key.ts";

const encoder = new TextEncoder();

function eq(actual: string | number[], expected: Key[]): void {
  if (typeof actual === "string") {
    assertEquals(parse(encoder.encode(actual)), expected);
  } else {
    assertEquals(parse(new Uint8Array(actual)), expected);
  }
}

/*
Deno.test("Characters", () => {
  eq("a", new CharKey("a"));
  eq("A", new CharKey("A"));
  eq("0", new CharKey("0", { ctrl: true }));
  eq("$", new CharKey("$"));
});

Deno.test("Func keys", () => {
  eq("\x1b[2~", new FuncKey("INSERT"));
  eq("\x1b[3~", new FuncKey("DELETE"));
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
  eq("\x1bOQ", new FuncKey("F2"));
  eq("\x1bOR", new FuncKey("F3"));
  eq("\x1bOS", new FuncKey("F4"));
  eq("\x1b[15~", new FuncKey("F5"));
  eq("\x1b[17~", new FuncKey("F6"));
  eq("\x1b[18~", new FuncKey("F7"));
  eq("\x1b[19~", new FuncKey("F8"));
  eq("\x1b[20~", new FuncKey("F9"));
  eq("\x1b[21~", new FuncKey("F10"));
  eq("\x1b[23~", new FuncKey("F11"));
  eq("\x1b[24~", new FuncKey("F12"));

  eq("\x1b[29~", new FuncKey("MENU"));
});
*/

Deno.test("ENTER", () => {
  eq([0xd], [
    new FuncKey("ENTER"),
    new FuncKey("ENTER", { ctrl: true }),
    new FuncKey("ENTER", { shift: true }),
    new FuncKey("ENTER", { ctrl: true, shift: true }),
  ]);

  eq([0x1b, 0xd], [
    new FuncKey("ENTER", { alt: true }),
    new FuncKey("ENTER", { alt: true, shift: true }),
    new FuncKey("ENTER", { ctrl: true, alt: true }),
  ]);
});

Deno.test("ESC", () => {
  eq([0x1b], [
    new FuncKey("ESC"),
    new FuncKey("ESC", { ctrl: true }),
    new FuncKey("ESC", { shift: true }),
    new FuncKey("ESC", { ctrl: true, shift: true }),
  ]);

  eq([0x1b, 0x1b], [
    new FuncKey("ESC", { alt: true }),
    new FuncKey("ESC", { alt: true, shift: true }),
    new FuncKey("ESC", { ctrl: true, alt: true }),
  ]);
});

Deno.test("BACKSPACE", () => {
  eq([0x7f], [
    new FuncKey("BACKSPACE"),
    new FuncKey("BACKSPACE", { shift: true }),
  ]);

  eq([0x8], [
    new FuncKey("BACKSPACE", { ctrl: true }),
    new FuncKey("BACKSPACE", { ctrl: true, shift: true }),
  ]);

  eq([0x1b, 0x7f], [
    new FuncKey("BACKSPACE", { alt: true }),
    new FuncKey("BACKSPACE", { alt: true, shift: true }),
  ]);

  eq([0x1b, 0x8], [
    new FuncKey("BACKSPACE", { ctrl: true, alt: true }),
  ]);
});

Deno.test("TAB", () => {
  eq([0x9], [
    new FuncKey("TAB"),
    new FuncKey("TAB", { ctrl: true }),
  ]);

  eq([0x1b, 0x9], [
    new FuncKey("TAB", { alt: true }),
    new FuncKey("TAB", { ctrl: true, alt: true }),
  ]);

  eq("\x1b[Z", [
    new FuncKey("TAB", { shift: true }),
    new FuncKey("TAB", { ctrl: true, shift: true }),
  ]);

  eq("\x1b\x1b[Z", [
    new FuncKey("TAB", { alt: true, shift: true }),
  ]);
});

Deno.test("SPACE", () => {
  eq([0x20], [
    new CharKey(" "),
    new CharKey(" ", { shift: true }),
  ]);

  eq([0x0], [
    new CharKey(" ", { ctrl: true }),
    new CharKey(" ", { ctrl: true, shift: true }),
  ]);

  eq([0x1b, 0x20], [
    new CharKey(" ", { alt: true }),
    new CharKey(" ", { alt: true, shift: true }),
  ]);

  eq([0x1b, 0x0], [
    new CharKey(" ", { ctrl: true, alt: true }),
  ]);
});

/*
Deno.test("alt + character", () => {
  eq("\x1bi", new CharKey("i", { alt: true }));
  eq("\x1bI", new CharKey("I", { alt: true }));
});

Deno.test("ctrl + character", () => {
  eq([0], new CharKey(" ", { ctrl: true, shift: true }));
  eq([31], new CharKey("/", { ctrl: true }));
  eq([48], new CharKey("0", { ctrl: true }));

  //eq([49], new CharKey("1", { ctrl: true }));
  //eq([0], new CharKey("2", { ctrl: true }));
  //eq([27], new CharKey("3", { ctrl: true }));
});
*/
