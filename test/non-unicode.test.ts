import { assertEquals } from "@std/assert";
import { parse } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: string): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}

Deno.test("ENTER", () => {
  is("\x0d", "\r");
});

Deno.test("TAB", () => {
  is("\x09", "\t");
});

Deno.test("BACKSPACE", () => {
  is("\x7f", "\x7f");
  is("\x08", "\x08");
});
