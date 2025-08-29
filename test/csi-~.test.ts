import type { KittyKey } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("INSERT", () => {
  const key: KittyKey = {
    name: "INSERT",
    code: 2,
  };

  assert_parse_key("\x1b[2~", [key, 4]);

  assert_parse_key("\x1b[2;5~", [{ ...key, ctrl: true }, 6]);
  assert_parse_key("\x1b[2;3~", [{ ...key, alt: true }, 6]);
  assert_parse_key("\x1b[2;2~", [{ ...key, shift: true }, 6]);

  assert_parse_key("\x1b[2;1:1~", [{ ...key, event: "press" }, 8]);
  assert_parse_key("\x1b[2;1:2~", [{ ...key, event: "repeat" }, 8]);
  assert_parse_key("\x1b[2;1:3~", [{ ...key, event: "release" }, 8]);
});
