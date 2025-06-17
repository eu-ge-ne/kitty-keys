import { assertEquals } from "@std/assert";
import { type KeyEvent, parse } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: KeyEvent): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}

Deno.test("LEFT", () => {
  is("\x1b[D", { key: "D", type: "press" });
  is("\x1b[1D", { key: "1D", type: "press" });

  is("\x1b[1;5D", { key: "1D", type: "press", ctrl: true });
  is("\x1b[1;3D", { key: "1D", type: "press", alt: true });
  is("\x1b[1;2D", { key: "1D", type: "press", shift: true });
  is("\x1b[1;65D", { key: "1D", type: "press", caps_lock: true });

  is("\x1b[1;1:1D", { key: "1D", type: "press" });
  is("\x1b[1;1:2D", { key: "1D", type: "repeat" });
  is("\x1b[1;1:3D", { key: "1D", type: "release" });
});

Deno.test("RIGHT", () => {
  is("\x1b[C", { key: "C", type: "press" });
  is("\x1b[1C", { key: "1C", type: "press" });

  is("\x1b[1;5C", { key: "1C", type: "press", ctrl: true });
  is("\x1b[1;3C", { key: "1C", type: "press", alt: true });
  is("\x1b[1;2C", { key: "1C", type: "press", shift: true });
  is("\x1b[1;65C", { key: "1C", type: "press", caps_lock: true });

  is("\x1b[1;1:1C", { key: "1C", type: "press" });
  is("\x1b[1;1:2C", { key: "1C", type: "repeat" });
  is("\x1b[1;1:3C", { key: "1C", type: "release" });
});

Deno.test("UP", () => {
  is("\x1b[A", { key: "A", type: "press" });
  is("\x1b[1A", { key: "1A", type: "press" });

  is("\x1b[1;5A", { key: "1A", type: "press", ctrl: true });
  is("\x1b[1;3A", { key: "1A", type: "press", alt: true });
  is("\x1b[1;2A", { key: "1A", type: "press", shift: true });
  is("\x1b[1;65A", { key: "1A", type: "press", caps_lock: true });

  is("\x1b[1;1:1A", { key: "1A", type: "press" });
  is("\x1b[1;1:2A", { key: "1A", type: "repeat" });
  is("\x1b[1;1:3A", { key: "1A", type: "release" });
});

Deno.test("DOWN", () => {
  is("\x1b[B", { key: "B", type: "press" });
  is("\x1b[1B", { key: "1B", type: "press" });

  is("\x1b[1;5B", { key: "1B", type: "press", ctrl: true });
  is("\x1b[1;3B", { key: "1B", type: "press", alt: true });
  is("\x1b[1;2B", { key: "1B", type: "press", shift: true });
  is("\x1b[1;65B", { key: "1B", type: "press", caps_lock: true });

  is("\x1b[1;1:1B", { key: "1B", type: "press" });
  is("\x1b[1;1:2B", { key: "1B", type: "repeat" });
  is("\x1b[1;1:3B", { key: "1B", type: "release" });
});

Deno.test("HOME", () => {
  is("\x1b[H", { key: "H", type: "press" });
  is("\x1b[1H", { key: "1H", type: "press" });

  is("\x1b[1;5H", { key: "1H", type: "press", ctrl: true });
  is("\x1b[1;3H", { key: "1H", type: "press", alt: true });
  is("\x1b[1;2H", { key: "1H", type: "press", shift: true });
  is("\x1b[1;65H", { key: "1H", type: "press", caps_lock: true });

  is("\x1b[1;1:1H", { key: "1H", type: "press" });
  is("\x1b[1;1:2H", { key: "1H", type: "repeat" });
  is("\x1b[1;1:3H", { key: "1H", type: "release" });
});

Deno.test("END", () => {
  is("\x1b[F", { key: "F", type: "press" });
  is("\x1b[1F", { key: "1F", type: "press" });

  is("\x1b[1;5F", { key: "1F", type: "press", ctrl: true });
  is("\x1b[1;3F", { key: "1F", type: "press", alt: true });
  is("\x1b[1;2F", { key: "1F", type: "press", shift: true });
  is("\x1b[1;65F", { key: "1F", type: "press", caps_lock: true });

  is("\x1b[1;1:1F", { key: "1F", type: "press" });
  is("\x1b[1;1:2F", { key: "1F", type: "repeat" });
  is("\x1b[1;1:3F", { key: "1F", type: "release" });
});
