import type { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("LEFT", () => {
  const key: Key = {
    name: "LEFT",
    code: 1,
  };

  assert_parse_key("\x1b[1D", [key, 0, 4]);

  assert_parse_key("\x1b[1;5D", [{ ...key, ctrl: true }, 0, 6]);
  assert_parse_key("\x1b[1;3D", [{ ...key, alt: true }, 0, 6]);
  assert_parse_key("\x1b[1;2D", [{ ...key, shift: true }, 0, 6]);

  assert_parse_key("\x1b[1;1:1D", [{ ...key, event: "press" }, 0, 8]);
  assert_parse_key("\x1b[1;1:2D", [{ ...key, event: "repeat" }, 0, 8]);
  assert_parse_key("\x1b[1;1:3D", [{ ...key, event: "release" }, 0, 8]);
});
