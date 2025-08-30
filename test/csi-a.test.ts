import type { KittyKey } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("LEFT", () => {
  const key: KittyKey = {
    name: "LEFT",
    code: 1,
    shift_code: undefined,
    base_code: undefined,
    event: "press",
  };

  assert_parse_key("\x1b[1D", [key, 4]);

  assert_parse_key("\x1b[1;5D", [{ ...key, ctrl: true }, 6]);
  assert_parse_key("\x1b[1;3D", [{ ...key, alt: true }, 6]);
  assert_parse_key("\x1b[1;2D", [{ ...key, shift: true }, 6]);

  assert_parse_key("\x1b[1;1:1D", [{ ...key, event: "press" }, 8]);
  assert_parse_key("\x1b[1;1:2D", [{ ...key, event: "repeat" }, 8]);
  assert_parse_key("\x1b[1;1:3D", [{ ...key, event: "release" }, 8]);
});
