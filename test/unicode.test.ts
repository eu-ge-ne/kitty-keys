import { assertEquals } from "@std/assert";
import { parse_unicode_key_event, type UnicodeKeyEvent } from "../src/key.ts";

export function is(actual: string, expected: UnicodeKeyEvent): void {
  assertEquals(parse_unicode_key_event(actual), expected);
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
