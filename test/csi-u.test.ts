import type { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("ESC", () => {
  const key: Key = {
    key: "\x1b",
    event: "press",
    func: "ESC",
    prefix: "\x1b[",
    scheme: "u",
  };

  assert_parse_key("\x1b[27u", key);

  assert_parse_key("\x1b[27;5u", { ...key, ctrl: true });
  assert_parse_key("\x1b[27;3u", { ...key, alt: true });
  assert_parse_key("\x1b[27;2u", { ...key, shift: true });

  assert_parse_key("\x1b[27;1:1u", key);
  assert_parse_key("\x1b[27;1:2u", { ...key, event: "repeat" });
  assert_parse_key("\x1b[27;1:3u", { ...key, event: "release" });
});

Deno.test("ENTER", () => {
  const key: Key = {
    key: "\r",
    event: "press",
    func: "ENTER",
    prefix: "\x1b[",
    scheme: "u",
  };

  assert_parse_key("\x1b[13u", key);

  assert_parse_key("\x1b[13;5u", { ...key, ctrl: true });
  assert_parse_key("\x1b[13;3u", { ...key, alt: true });
  assert_parse_key("\x1b[13;2u", { ...key, shift: true });

  assert_parse_key("\x1b[13;1:1u", key);
  assert_parse_key("\x1b[13;1:2u", { ...key, event: "repeat" });
  assert_parse_key("\x1b[13;1:3u", { ...key, event: "release" });
});

Deno.test("TAB", () => {
  const key: Key = {
    key: "\t",
    event: "press",
    func: "TAB",
    prefix: "\x1b[",
    scheme: "u",
  };

  assert_parse_key("\x1b[9u", key);

  assert_parse_key("\x1b[9;5u", { ...key, ctrl: true });
  assert_parse_key("\x1b[9;3u", { ...key, alt: true });
  assert_parse_key("\x1b[9;2u", { ...key, shift: true });

  assert_parse_key("\x1b[9;1:1u", key);
  assert_parse_key("\x1b[9;1:2u", { ...key, event: "repeat" });
  assert_parse_key("\x1b[9;1:3u", { ...key, event: "release" });
});

Deno.test("BACKSPACE", () => {
  const key: Key = {
    key: "\x7f",
    event: "press",
    func: "BACKSPACE",
    prefix: "\x1b[",
    scheme: "u",
  };

  assert_parse_key("\x1b[127u", key);

  assert_parse_key("\x1b[127;5u", { ...key, ctrl: true });
  assert_parse_key("\x1b[127;3u", { ...key, alt: true });
  assert_parse_key("\x1b[127;2u", { ...key, shift: true });

  assert_parse_key("\x1b[127;1:1u", key);
  assert_parse_key("\x1b[127;1:2u", { ...key, event: "repeat" });
  assert_parse_key("\x1b[127;1:3u", { ...key, event: "release" });
});

Deno.test("CAPS_LOCK", () => {
  const key: Key = {
    key: String.fromCodePoint(57358),
    event: "press",
    func: "CAPS_LOCK",
    prefix: "\x1b[",
    scheme: "u",
  };

  assert_parse_key("\x1b[57358u", key);

  assert_parse_key("\x1b[57358;5u", { ...key, ctrl: true });
  assert_parse_key("\x1b[57358;3u", { ...key, alt: true });
  assert_parse_key("\x1b[57358;2u", { ...key, shift: true });

  assert_parse_key("\x1b[57358;1:1u", key);
  assert_parse_key("\x1b[57358;1:2u", { ...key, event: "repeat" });
  assert_parse_key("\x1b[57358;1:3u", { ...key, event: "release" });
});

Deno.test("SCROLL_LOCK", () => {
  const key: Key = {
    key: String.fromCodePoint(57359),
    event: "press",
    func: "SCROLL_LOCK",
    prefix: "\x1b[",
    scheme: "u",
  };

  assert_parse_key("\x1b[57359u", key);

  assert_parse_key("\x1b[57359;5u", { ...key, ctrl: true });
  assert_parse_key("\x1b[57359;3u", { ...key, alt: true });
  assert_parse_key("\x1b[57359;2u", { ...key, shift: true });

  assert_parse_key("\x1b[57359;1:1u", key);
  assert_parse_key("\x1b[57359;1:2u", { ...key, event: "repeat" });
  assert_parse_key("\x1b[57359;1:3u", { ...key, event: "release" });
});

Deno.test("NUM_LOCK", () => {
  const key: Key = {
    key: String.fromCodePoint(57360),
    event: "press",
    func: "NUM_LOCK",
    prefix: "\x1b[",
    scheme: "u",
  };

  assert_parse_key("\x1b[57360u", key);

  assert_parse_key("\x1b[57360;5u", { ...key, ctrl: true });
  assert_parse_key("\x1b[57360;3u", { ...key, alt: true });
  assert_parse_key("\x1b[57360;2u", { ...key, shift: true });

  assert_parse_key("\x1b[57360;1:1u", key);
  assert_parse_key("\x1b[57360;1:2u", { ...key, event: "repeat" });
  assert_parse_key("\x1b[57360;1:3u", { ...key, event: "release" });
});

Deno.test("PRINT_SCREEN", () => {
  const key: Key = {
    key: String.fromCodePoint(57361),
    event: "press",
    func: "PRINT_SCREEN",
    prefix: "\x1b[",
    scheme: "u",
  };

  assert_parse_key("\x1b[57361u", key);

  assert_parse_key("\x1b[57361;5u", { ...key, ctrl: true });
  assert_parse_key("\x1b[57361;3u", { ...key, alt: true });
  assert_parse_key("\x1b[57361;2u", { ...key, shift: true });

  assert_parse_key("\x1b[57361;1:1u", key);
  assert_parse_key("\x1b[57361;1:2u", { ...key, event: "repeat" });
  assert_parse_key("\x1b[57361;1:3u", { ...key, event: "release" });
});

Deno.test("PAUSE", () => {
  const key: Key = {
    key: String.fromCodePoint(57362),
    event: "press",
    func: "PAUSE",
    prefix: "\x1b[",
    scheme: "u",
  };

  assert_parse_key("\x1b[57362u", key);

  assert_parse_key("\x1b[57362;5u", { ...key, ctrl: true });
  assert_parse_key("\x1b[57362;3u", { ...key, alt: true });
  assert_parse_key("\x1b[57362;2u", { ...key, shift: true });

  assert_parse_key("\x1b[57362;1:1u", key);
  assert_parse_key("\x1b[57362;1:2u", { ...key, event: "repeat" });
  assert_parse_key("\x1b[57362;1:3u", { ...key, event: "release" });
});

Deno.test("MENU", () => {
  const key: Key = {
    key: String.fromCodePoint(57363),
    event: "press",
    func: "MENU",
    prefix: "\x1b[",
    scheme: "u",
  };

  assert_parse_key("\x1b[57363u", key);

  assert_parse_key("\x1b[57363;5u", { ...key, ctrl: true });
  assert_parse_key("\x1b[57363;3u", { ...key, alt: true });
  assert_parse_key("\x1b[57363;2u", { ...key, shift: true });

  assert_parse_key("\x1b[57363;1:1u", key);
  assert_parse_key("\x1b[57363;1:2u", { ...key, event: "repeat" });
  assert_parse_key("\x1b[57363;1:3u", { ...key, event: "release" });
});

Deno.test("LEFT_SHIFT", () => {
  const key: Key = {
    key: String.fromCodePoint(57441),
    event: "press",
    func: "LEFT_SHIFT",
    prefix: "\x1b[",
    scheme: "u",
  };

  assert_parse_key("\x1b[57441u", key);

  assert_parse_key("\x1b[57441;5u", { ...key, ctrl: true });
  assert_parse_key("\x1b[57441;3u", { ...key, alt: true });
  assert_parse_key("\x1b[57441;2u", { ...key, shift: true });

  assert_parse_key("\x1b[57441;1:1u", key);
  assert_parse_key("\x1b[57441;1:2u", { ...key, event: "repeat" });
  assert_parse_key("\x1b[57441;1:3u", { ...key, event: "release" });
});
