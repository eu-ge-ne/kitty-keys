import { assertEquals } from "@std/assert";
import { type KeyEvent, parse } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: KeyEvent): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}

Deno.test("F5", () => {
  const key = "15~";

  is("\x1b[15~", { key, unicode: false, type: "press" });

  is("\x1b[15;5~", { key, unicode: false, type: "press", ctrl: true });
  is("\x1b[15;3~", { key, unicode: false, type: "press", alt: true });
  is("\x1b[15;2~", { key, unicode: false, type: "press", shift: true });
  is("\x1b[15;65~", { key, unicode: false, type: "press", caps_lock: true });

  is("\x1b[15;1:1~", { key, unicode: false, type: "press" });
  is("\x1b[15;1:2~", { key, unicode: false, type: "repeat" });
  is("\x1b[15;1:3~", { key, unicode: false, type: "release" });
});
