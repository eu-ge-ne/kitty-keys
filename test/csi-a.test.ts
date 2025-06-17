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

Deno.test("F1", () => {
  is("\x1b[P", { key: "P", type: "press" });
  is("\x1b[1P", { key: "1P", type: "press" });

  is("\x1b[1;5P", { key: "1P", type: "press", ctrl: true });
  is("\x1b[1;3P", { key: "1P", type: "press", alt: true });
  is("\x1b[1;2P", { key: "1P", type: "press", shift: true });
  is("\x1b[1;65P", { key: "1P", type: "press", caps_lock: true });

  is("\x1b[1;1:1P", { key: "1P", type: "press" });
  is("\x1b[1;1:2P", { key: "1P", type: "repeat" });
  is("\x1b[1;1:3P", { key: "1P", type: "release" });
});

Deno.test("F2", () => {
  is("\x1b[Q", { key: "Q", type: "press" });
  is("\x1b[1Q", { key: "1Q", type: "press" });

  is("\x1b[1;5Q", { key: "1Q", type: "press", ctrl: true });
  is("\x1b[1;3Q", { key: "1Q", type: "press", alt: true });
  is("\x1b[1;2Q", { key: "1Q", type: "press", shift: true });
  is("\x1b[1;65Q", { key: "1Q", type: "press", caps_lock: true });

  is("\x1b[1;1:1Q", { key: "1Q", type: "press" });
  is("\x1b[1;1:2Q", { key: "1Q", type: "repeat" });
  is("\x1b[1;1:3Q", { key: "1Q", type: "release" });
});

Deno.test("F4", () => {
  is("\x1b[S", { key: "S", type: "press" });
  is("\x1b[1S", { key: "1S", type: "press" });

  is("\x1b[1;5S", { key: "1S", type: "press", ctrl: true });
  is("\x1b[1;3S", { key: "1S", type: "press", alt: true });
  is("\x1b[1;2S", { key: "1S", type: "press", shift: true });
  is("\x1b[1;65S", { key: "1S", type: "press", caps_lock: true });

  is("\x1b[1;1:1S", { key: "1S", type: "press" });
  is("\x1b[1;1:2S", { key: "1S", type: "repeat" });
  is("\x1b[1;1:3S", { key: "1S", type: "release" });
});
