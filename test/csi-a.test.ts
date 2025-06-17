import { assertEquals } from "@std/assert";
import { type KeyEvent, parse } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: KeyEvent): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}

Deno.test("LEFT", () => {
  const key = "\x01";

  is("\x1b[1D", { key, type: "press" });
});

Deno.test("RIGHT", () => {
  const key = "\x01";

  is("\x1b[1C", { key, type: "press" });
});
