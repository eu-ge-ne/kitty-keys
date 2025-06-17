import { assertEquals } from "@std/assert";
import { type KeyEvent, parse } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: KeyEvent): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}

Deno.test("F5", () => {
  const key = "\x0f";

  is("\x1b[15~", { key, type: "press" });

  is("\x1b[15;5u", { key, type: "press", ctrl: true });
  is("\x1b[15;3u", { key, type: "press", alt: true });
  is("\x1b[15;2u", { key, type: "press", shift: true });
  is("\x1b[15;65u", { key, type: "press", caps_lock: true });

  is("\x1b[15;1:1u", { key, type: "press" });
  is("\x1b[15;1:2u", { key, type: "repeat" });
  is("\x1b[15;1:3u", { key, type: "release" });
});
