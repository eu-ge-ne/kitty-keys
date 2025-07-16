import type { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("INSERT", () => {
  const key: Key = {
    code: 2,
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

    name: "INSERT",
    prefix: "\x1b[",
    scheme: "~",
  };

  assert_parse_key("\x1b[2~", key);

  assert_parse_key("\x1b[2;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[2;3~", { ...key, alt: true });
  assert_parse_key("\x1b[2;2~", { ...key, shift: true });

  assert_parse_key("\x1b[2;1:1~", key);
  assert_parse_key("\x1b[2;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[2;1:3~", { ...key, event: "release" });
});
