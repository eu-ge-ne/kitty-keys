import { assertEquals } from "@std/assert";
import { type KeyEvent, parse } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: KeyEvent): void {
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

Deno.test("ENTER", () => {
  is("\x1b[13u", { key: "\r", type: "press" });

  is("\x1b[13;5u", { key: "\r", type: "press", ctrl: true });
  is("\x1b[13;3u", { key: "\r", type: "press", alt: true });
  is("\x1b[13;2u", { key: "\r", type: "press", shift: true });
  is("\x1b[13;65u", { key: "\r", type: "press", caps_lock: true });

  is("\x1b[13;1:1u", { key: "\r", type: "press" });
  is("\x1b[13;1:2u", { key: "\r", type: "repeat" });
  is("\x1b[13;1:3u", { key: "\r", type: "release" });
});

Deno.test("TAB", () => {
  is("\x1b[9u", { key: "\t", type: "press" });

  is("\x1b[9;5u", { key: "\t", type: "press", ctrl: true });
  is("\x1b[9;3u", { key: "\t", type: "press", alt: true });
  is("\x1b[9;2u", { key: "\t", type: "press", shift: true });
  is("\x1b[9;65u", { key: "\t", type: "press", caps_lock: true });

  is("\x1b[9;1:1u", { key: "\t", type: "press" });
  is("\x1b[9;1:2u", { key: "\t", type: "repeat" });
  is("\x1b[9;1:3u", { key: "\t", type: "release" });
});
