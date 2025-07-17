import type { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("LEFT", () => {
  const key: Key = {
    name: "LEFT",
    code: 1,
  };

  assert_parse_key("\x1b[1D", key);

  assert_parse_key("\x1b[1;5D", { ...key, ctrl: true });
  assert_parse_key("\x1b[1;3D", { ...key, alt: true });
  assert_parse_key("\x1b[1;2D", { ...key, shift: true });

  assert_parse_key("\x1b[1;1:1D", { ...key, event: "press" });
  assert_parse_key("\x1b[1;1:2D", { ...key, event: "repeat" });
  assert_parse_key("\x1b[1;1:3D", { ...key, event: "release" });
});
