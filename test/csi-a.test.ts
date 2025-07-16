import type { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("LEFT", () => {
  const key: Key = {
    code: 1,
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

    name: "LEFT",
    prefix: "\x1b[",
    scheme: "D",
  };

  assert_parse_key("\x1b[1D", key);

  assert_parse_key("\x1b[1;5D", { ...key, ctrl: true });
  assert_parse_key("\x1b[1;3D", { ...key, alt: true });
  assert_parse_key("\x1b[1;2D", { ...key, shift: true });

  assert_parse_key("\x1b[1;1:1D", key);
  assert_parse_key("\x1b[1;1:2D", { ...key, event: "repeat" });
  assert_parse_key("\x1b[1;1:3D", { ...key, event: "release" });
});
