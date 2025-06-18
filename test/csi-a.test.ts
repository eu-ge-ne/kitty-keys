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
  is("\x1b[1;3D", { ...key, alt_option: true });
  is("\x1b[1;2D", { ...key, shift: true });

  is("\x1b[1;1:1D", key);
  is("\x1b[1;1:2D", { ...key, event: "repeat" });
  is("\x1b[1;1:3D", { ...key, event: "release" });
});

Deno.test("RIGHT", () => {
  const key: Key = { key: "1C", event: "press", name: "RIGHT" };

  is("\x1b[C", { ...key, key: "C" });
  is("\x1b[1C", key);

  is("\x1b[1;5C", { ...key, ctrl: true });
  is("\x1b[1;3C", { ...key, alt_option: true });
  is("\x1b[1;2C", { ...key, shift: true });

  is("\x1b[1;1:1C", key);
  is("\x1b[1;1:2C", { ...key, event: "repeat" });
  is("\x1b[1;1:3C", { ...key, event: "release" });
});

Deno.test("UP", () => {
  const key: Key = { key: "1A", event: "press", name: "UP" };

  is("\x1b[A", { ...key, key: "A" });
  is("\x1b[1A", key);

  is("\x1b[1;5A", { ...key, ctrl: true });
  is("\x1b[1;3A", { ...key, alt_option: true });
  is("\x1b[1;2A", { ...key, shift: true });

  is("\x1b[1;1:1A", key);
  is("\x1b[1;1:2A", { ...key, event: "repeat" });
  is("\x1b[1;1:3A", { ...key, event: "release" });
});

Deno.test("DOWN", () => {
  const key: Key = { key: "1B", event: "press", name: "DOWN" };

  is("\x1b[B", { ...key, key: "B" });
  is("\x1b[1B", key);

  is("\x1b[1;5B", { ...key, ctrl: true });
  is("\x1b[1;3B", { ...key, alt_option: true });
  is("\x1b[1;2B", { ...key, shift: true });

  is("\x1b[1;1:1B", key);
  is("\x1b[1;1:2B", { ...key, event: "repeat" });
  is("\x1b[1;1:3B", { ...key, event: "release" });
});

Deno.test("HOME", () => {
  const key: Key = { key: "1H", event: "press", name: "HOME" };

  is("\x1b[H", { ...key, key: "H" });
  is("\x1b[1H", key);

  is("\x1b[1;5H", { ...key, ctrl: true });
  is("\x1b[1;3H", { ...key, alt_option: true });
  is("\x1b[1;2H", { ...key, shift: true });

  is("\x1b[1;1:1H", key);
  is("\x1b[1;1:2H", { ...key, event: "repeat" });
  is("\x1b[1;1:3H", { ...key, event: "release" });
});

Deno.test("END", () => {
  const key: Key = { key: "1F", event: "press", name: "END" };

  is("\x1b[F", { ...key, key: "F" });
  is("\x1b[1F", key);

  is("\x1b[1;5F", { ...key, ctrl: true });
  is("\x1b[1;3F", { ...key, alt_option: true });
  is("\x1b[1;2F", { ...key, shift: true });

  is("\x1b[1;1:1F", key);
  is("\x1b[1;1:2F", { ...key, event: "repeat" });
  is("\x1b[1;1:3F", { ...key, event: "release" });
});

Deno.test("F1", () => {
  const key: Key = { key: "1P", event: "press", name: "F1" };

  is("\x1b[P", { ...key, key: "P" });
  is("\x1b[1P", key);

  is("\x1b[1;5P", { ...key, ctrl: true });
  is("\x1b[1;3P", { ...key, alt_option: true });
  is("\x1b[1;2P", { ...key, shift: true });

  is("\x1b[1;1:1P", key);
  is("\x1b[1;1:2P", { ...key, event: "repeat" });
  is("\x1b[1;1:3P", { ...key, event: "release" });
});

Deno.test("F2", () => {
  const key: Key = { key: "1Q", event: "press", name: "F2" };

  is("\x1b[Q", { ...key, key: "Q" });
  is("\x1b[1Q", key);

  is("\x1b[1;5Q", { ...key, ctrl: true });
  is("\x1b[1;3Q", { ...key, alt_option: true });
  is("\x1b[1;2Q", { ...key, shift: true });

  is("\x1b[1;1:1Q", key);
  is("\x1b[1;1:2Q", { ...key, event: "repeat" });
  is("\x1b[1;1:3Q", { ...key, event: "release" });
});

Deno.test("F4", () => {
  const key: Key = { key: "1S", event: "press", name: "F4" };

  is("\x1b[S", { ...key, key: "S" });
  is("\x1b[1S", key);

  is("\x1b[1;5S", { ...key, ctrl: true });
  is("\x1b[1;3S", { ...key, alt_option: true });
  is("\x1b[1;2S", { ...key, shift: true });

  is("\x1b[1;1:1S", key);
  is("\x1b[1;1:2S", { ...key, event: "repeat" });
  is("\x1b[1;1:3S", { ...key, event: "release" });
});
