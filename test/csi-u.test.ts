import type { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("ESC", () => {
  const key: Key = {
    name: "ESC",

    code: 27,
    shifted_code: undefined,
    base_layout_code: undefined,
    event: "press",
    text: undefined,

    shift: false,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
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
    name: "ENTER",

    code: 13,
    shifted_code: undefined,
    base_layout_code: undefined,
    event: "press",
    text: undefined,

    shift: false,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
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
    name: "TAB",

    code: 9,
    shifted_code: undefined,
    base_layout_code: undefined,
    event: "press",
    text: undefined,

    shift: false,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
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
    name: "BACKSPACE",

    code: 127,
    shifted_code: undefined,
    base_layout_code: undefined,
    event: "press",
    text: undefined,

    shift: false,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
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
    name: "CAPS_LOCK",

    code: 57358,
    shifted_code: undefined,
    base_layout_code: undefined,
    event: "press",
    text: undefined,

    shift: false,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
  };

  assert_parse_key("\x1b[57358u", key);

  assert_parse_key("\x1b[57358;5u", { ...key, ctrl: true });
  assert_parse_key("\x1b[57358;3u", { ...key, alt: true });
  assert_parse_key("\x1b[57358;2u", { ...key, shift: true });

  assert_parse_key("\x1b[57358;1:1u", key);
  assert_parse_key("\x1b[57358;1:2u", { ...key, event: "repeat" });
  assert_parse_key("\x1b[57358;1:3u", { ...key, event: "release" });
});
