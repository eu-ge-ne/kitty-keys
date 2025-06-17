import { assertEquals } from "@std/assert";
import { type Key, parse_key } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: Key): void {
  assertEquals(parse_key(encoder.encode(actual)), expected);
}

Deno.test("LEFT", () => {
  const key: Key = { key: "1D", event: "press", name: "LEFT" };

  is("\x1b[D", { ...key, key: "D" });
  is("\x1b[1D", key);

  is("\x1b[1;5D", { ...key, ctrl: true });
  is("\x1b[1;3D", { ...key, alt: true });
  is("\x1b[1;2D", { ...key, shift: true });
  is("\x1b[1;65D", { ...key, caps_lock: true });

  is("\x1b[1;1:1D", key);
  is("\x1b[1;1:2D", { ...key, event: "repeat" });
  is("\x1b[1;1:3D", { ...key, event: "release" });
});

Deno.test("RIGHT", () => {
  const key: Key = { key: "1C", event: "press", name: "RIGHT" };

  is("\x1b[C", { ...key, key: "C" });
  is("\x1b[1C", key);

  is("\x1b[1;5C", { ...key, ctrl: true });
  is("\x1b[1;3C", { ...key, alt: true });
  is("\x1b[1;2C", { ...key, shift: true });
  is("\x1b[1;65C", { ...key, caps_lock: true });

  is("\x1b[1;1:1C", key);
  is("\x1b[1;1:2C", { ...key, event: "repeat" });
  is("\x1b[1;1:3C", { ...key, event: "release" });
});

Deno.test("UP", () => {
  const key: Key = { key: "1A", event: "press", name: "UP" };

  is("\x1b[A", { ...key, key: "A" });
  is("\x1b[1A", key);

  is("\x1b[1;5A", { ...key, ctrl: true });
  is("\x1b[1;3A", { ...key, alt: true });
  is("\x1b[1;2A", { ...key, shift: true });
  is("\x1b[1;65A", { ...key, caps_lock: true });

  is("\x1b[1;1:1A", key);
  is("\x1b[1;1:2A", { ...key, event: "repeat" });
  is("\x1b[1;1:3A", { ...key, event: "release" });
});

Deno.test("DOWN", () => {
  const key: Key = { key: "1B", event: "press", name: "DOWN" };

  is("\x1b[B", { ...key, key: "B" });
  is("\x1b[1B", key);

  is("\x1b[1;5B", { ...key, ctrl: true });
  is("\x1b[1;3B", { ...key, alt: true });
  is("\x1b[1;2B", { ...key, shift: true });
  is("\x1b[1;65B", { ...key, caps_lock: true });

  is("\x1b[1;1:1B", key);
  is("\x1b[1;1:2B", { ...key, event: "repeat" });
  is("\x1b[1;1:3B", { ...key, event: "release" });
});

Deno.test("HOME", () => {
  is("\x1b[H", { key: "H", event: "press" });
  is("\x1b[1H", { key: "1H", event: "press" });

  is("\x1b[1;5H", { key: "1H", event: "press", ctrl: true });
  is("\x1b[1;3H", { key: "1H", event: "press", alt: true });
  is("\x1b[1;2H", { key: "1H", event: "press", shift: true });
  is("\x1b[1;65H", { key: "1H", event: "press", caps_lock: true });

  is("\x1b[1;1:1H", { key: "1H", event: "press" });
  is("\x1b[1;1:2H", { key: "1H", event: "repeat" });
  is("\x1b[1;1:3H", { key: "1H", event: "release" });
});

Deno.test("END", () => {
  is("\x1b[F", { key: "F", event: "press" });
  is("\x1b[1F", { key: "1F", event: "press" });

  is("\x1b[1;5F", { key: "1F", event: "press", ctrl: true });
  is("\x1b[1;3F", { key: "1F", event: "press", alt: true });
  is("\x1b[1;2F", { key: "1F", event: "press", shift: true });
  is("\x1b[1;65F", { key: "1F", event: "press", caps_lock: true });

  is("\x1b[1;1:1F", { key: "1F", event: "press" });
  is("\x1b[1;1:2F", { key: "1F", event: "repeat" });
  is("\x1b[1;1:3F", { key: "1F", event: "release" });
});

Deno.test("F1", () => {
  is("\x1b[P", { key: "P", event: "press" });
  is("\x1b[1P", { key: "1P", event: "press" });

  is("\x1b[1;5P", { key: "1P", event: "press", ctrl: true });
  is("\x1b[1;3P", { key: "1P", event: "press", alt: true });
  is("\x1b[1;2P", { key: "1P", event: "press", shift: true });
  is("\x1b[1;65P", { key: "1P", event: "press", caps_lock: true });

  is("\x1b[1;1:1P", { key: "1P", event: "press" });
  is("\x1b[1;1:2P", { key: "1P", event: "repeat" });
  is("\x1b[1;1:3P", { key: "1P", event: "release" });
});

Deno.test("F2", () => {
  is("\x1b[Q", { key: "Q", event: "press" });
  is("\x1b[1Q", { key: "1Q", event: "press" });

  is("\x1b[1;5Q", { key: "1Q", event: "press", ctrl: true });
  is("\x1b[1;3Q", { key: "1Q", event: "press", alt: true });
  is("\x1b[1;2Q", { key: "1Q", event: "press", shift: true });
  is("\x1b[1;65Q", { key: "1Q", event: "press", caps_lock: true });

  is("\x1b[1;1:1Q", { key: "1Q", event: "press" });
  is("\x1b[1;1:2Q", { key: "1Q", event: "repeat" });
  is("\x1b[1;1:3Q", { key: "1Q", event: "release" });
});

Deno.test("F4", () => {
  is("\x1b[S", { key: "S", event: "press" });
  is("\x1b[1S", { key: "1S", event: "press" });

  is("\x1b[1;5S", { key: "1S", event: "press", ctrl: true });
  is("\x1b[1;3S", { key: "1S", event: "press", alt: true });
  is("\x1b[1;2S", { key: "1S", event: "press", shift: true });
  is("\x1b[1;65S", { key: "1S", event: "press", caps_lock: true });

  is("\x1b[1;1:1S", { key: "1S", event: "press" });
  is("\x1b[1;1:2S", { key: "1S", event: "repeat" });
  is("\x1b[1;1:3S", { key: "1S", event: "release" });
});
