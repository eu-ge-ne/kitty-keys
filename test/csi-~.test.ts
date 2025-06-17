import { assertEquals } from "@std/assert";
import { type KeyEvent, parse } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: KeyEvent): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}

Deno.test("INSERT", () => {
  const key = "2~";

  is("\x1b[2~", { key, type: "press" });

  is("\x1b[2;5~", { key, type: "press", ctrl: true });
  is("\x1b[2;3~", { key, type: "press", alt: true });
  is("\x1b[2;2~", { key, type: "press", shift: true });
  is("\x1b[2;65~", { key, type: "press", caps_lock: true });

  is("\x1b[2;1:1~", { key, type: "press" });
  is("\x1b[2;1:2~", { key, type: "repeat" });
  is("\x1b[2;1:3~", { key, type: "release" });
});

Deno.test("DELETE", () => {
  const key = "3~";

  is("\x1b[3~", { key, type: "press" });

  is("\x1b[3;5~", { key, type: "press", ctrl: true });
  is("\x1b[3;3~", { key, type: "press", alt: true });
  is("\x1b[3;2~", { key, type: "press", shift: true });
  is("\x1b[3;65~", { key, type: "press", caps_lock: true });

  is("\x1b[3;1:1~", { key, type: "press" });
  is("\x1b[3;1:2~", { key, type: "repeat" });
  is("\x1b[3;1:3~", { key, type: "release" });
});

Deno.test("F5", () => {
  const key = "15~";

  is("\x1b[15~", { key, type: "press" });

  is("\x1b[15;5~", { key, type: "press", ctrl: true });
  is("\x1b[15;3~", { key, type: "press", alt: true });
  is("\x1b[15;2~", { key, type: "press", shift: true });
  is("\x1b[15;65~", { key, type: "press", caps_lock: true });

  is("\x1b[15;1:1~", { key, type: "press" });
  is("\x1b[15;1:2~", { key, type: "repeat" });
  is("\x1b[15;1:3~", { key, type: "release" });
});
