import { assertEquals } from "@std/assert";
import { parse, type UnicodeKeyEvent } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: UnicodeKeyEvent | string): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}

Deno.test("ESC", () => {
  is("\x1b[27u", { key: "\x1b", type: "press" });

  is("\x1b[27;5u", { key: "\x1b", type: "press", ctrl: true });
  is("\x1b[27;3u", { key: "\x1b", type: "press", alt: true });
  is("\x1b[27;2u", { key: "\x1b", type: "press", shift: true });
  is("\x1b[27;65u", { key: "\x1b", type: "press", caps_lock: true });

  is("\x1b[27;1:1u", { key: "\x1b", type: "press" });
  is("\x1b[27;1:2u", { key: "\x1b", type: "repeat" });
  is("\x1b[27;1:3u", { key: "\x1b", type: "release" });
});
