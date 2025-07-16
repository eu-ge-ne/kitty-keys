import type { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("LEFT", () => {
  const key: Key = {
    key: "1D",
    event: "press",
    func: "LEFT",
    prefix: "\x1b[",
    scheme: "D",
  };

  assert_parse_key("\x1b[D", { ...key, key: "D" });
  assert_parse_key("\x1b[1D", key);

  assert_parse_key("\x1b[1;5D", { ...key, ctrl: true });
  assert_parse_key("\x1b[1;3D", { ...key, alt: true });
  assert_parse_key("\x1b[1;2D", { ...key, shift: true });

  assert_parse_key("\x1b[1;1:1D", key);
  assert_parse_key("\x1b[1;1:2D", { ...key, event: "repeat" });
  assert_parse_key("\x1b[1;1:3D", { ...key, event: "release" });
});

Deno.test("RIGHT", () => {
  const key: Key = {
    key: "1C",
    event: "press",
    func: "RIGHT",
    prefix: "\x1b[",
    scheme: "C",
  };

  assert_parse_key("\x1b[C", { ...key, key: "C" });
  assert_parse_key("\x1b[1C", key);

  assert_parse_key("\x1b[1;5C", { ...key, ctrl: true });
  assert_parse_key("\x1b[1;3C", { ...key, alt: true });
  assert_parse_key("\x1b[1;2C", { ...key, shift: true });

  assert_parse_key("\x1b[1;1:1C", key);
  assert_parse_key("\x1b[1;1:2C", { ...key, event: "repeat" });
  assert_parse_key("\x1b[1;1:3C", { ...key, event: "release" });
});

Deno.test("UP", () => {
  const key: Key = {
    key: "1A",
    event: "press",
    func: "UP",
    prefix: "\x1b[",
    scheme: "A",
  };

  assert_parse_key("\x1b[A", { ...key, key: "A" });
  assert_parse_key("\x1b[1A", key);

  assert_parse_key("\x1b[1;5A", { ...key, ctrl: true });
  assert_parse_key("\x1b[1;3A", { ...key, alt: true });
  assert_parse_key("\x1b[1;2A", { ...key, shift: true });

  assert_parse_key("\x1b[1;1:1A", key);
  assert_parse_key("\x1b[1;1:2A", { ...key, event: "repeat" });
  assert_parse_key("\x1b[1;1:3A", { ...key, event: "release" });
});

Deno.test("DOWN", () => {
  const key: Key = {
    key: "1B",
    event: "press",
    func: "DOWN",
    prefix: "\x1b[",
    scheme: "B",
  };

  assert_parse_key("\x1b[B", { ...key, key: "B" });
  assert_parse_key("\x1b[1B", key);

  assert_parse_key("\x1b[1;5B", { ...key, ctrl: true });
  assert_parse_key("\x1b[1;3B", { ...key, alt: true });
  assert_parse_key("\x1b[1;2B", { ...key, shift: true });

  assert_parse_key("\x1b[1;1:1B", key);
  assert_parse_key("\x1b[1;1:2B", { ...key, event: "repeat" });
  assert_parse_key("\x1b[1;1:3B", { ...key, event: "release" });
});

Deno.test("HOME", () => {
  const key: Key = {
    key: "1H",
    event: "press",
    func: "HOME",
    prefix: "\x1b[",
    scheme: "H",
  };

  assert_parse_key("\x1b[H", { ...key, key: "H" });
  assert_parse_key("\x1b[1H", key);

  assert_parse_key("\x1b[1;5H", { ...key, ctrl: true });
  assert_parse_key("\x1b[1;3H", { ...key, alt: true });
  assert_parse_key("\x1b[1;2H", { ...key, shift: true });

  assert_parse_key("\x1b[1;1:1H", key);
  assert_parse_key("\x1b[1;1:2H", { ...key, event: "repeat" });
  assert_parse_key("\x1b[1;1:3H", { ...key, event: "release" });
});

Deno.test("END", () => {
  const key: Key = {
    key: "1F",
    event: "press",
    func: "END",
    prefix: "\x1b[",
    scheme: "F",
  };

  assert_parse_key("\x1b[F", { ...key, key: "F" });
  assert_parse_key("\x1b[1F", key);

  assert_parse_key("\x1b[1;5F", { ...key, ctrl: true });
  assert_parse_key("\x1b[1;3F", { ...key, alt: true });
  assert_parse_key("\x1b[1;2F", { ...key, shift: true });

  assert_parse_key("\x1b[1;1:1F", key);
  assert_parse_key("\x1b[1;1:2F", { ...key, event: "repeat" });
  assert_parse_key("\x1b[1;1:3F", { ...key, event: "release" });
});

Deno.test("F1", () => {
  const key: Key = {
    key: "1P",
    event: "press",
    func: "F1",
    prefix: "\x1b[",
    scheme: "P",
  };

  assert_parse_key("\x1b[P", { ...key, key: "P" });
  assert_parse_key("\x1b[1P", key);

  assert_parse_key("\x1b[1;5P", { ...key, ctrl: true });
  assert_parse_key("\x1b[1;3P", { ...key, alt: true });
  assert_parse_key("\x1b[1;2P", { ...key, shift: true });

  assert_parse_key("\x1b[1;1:1P", key);
  assert_parse_key("\x1b[1;1:2P", { ...key, event: "repeat" });
  assert_parse_key("\x1b[1;1:3P", { ...key, event: "release" });
});

Deno.test("F2", () => {
  const key: Key = {
    key: "1Q",
    event: "press",
    func: "F2",
    prefix: "\x1b[",
    scheme: "Q",
  };

  assert_parse_key("\x1b[Q", { ...key, key: "Q" });
  assert_parse_key("\x1b[1Q", key);

  assert_parse_key("\x1b[1;5Q", { ...key, ctrl: true });
  assert_parse_key("\x1b[1;3Q", { ...key, alt: true });
  assert_parse_key("\x1b[1;2Q", { ...key, shift: true });

  assert_parse_key("\x1b[1;1:1Q", key);
  assert_parse_key("\x1b[1;1:2Q", { ...key, event: "repeat" });
  assert_parse_key("\x1b[1;1:3Q", { ...key, event: "release" });
});

Deno.test("F4", () => {
  const key: Key = {
    key: "1S",
    event: "press",
    func: "F4",
    prefix: "\x1b[",
    scheme: "S",
  };

  assert_parse_key("\x1b[S", { ...key, key: "S" });
  assert_parse_key("\x1b[1S", key);

  assert_parse_key("\x1b[1;5S", { ...key, ctrl: true });
  assert_parse_key("\x1b[1;3S", { ...key, alt: true });
  assert_parse_key("\x1b[1;2S", { ...key, shift: true });

  assert_parse_key("\x1b[1;1:1S", key);
  assert_parse_key("\x1b[1;1:2S", { ...key, event: "repeat" });
  assert_parse_key("\x1b[1;1:3S", { ...key, event: "release" });
});
