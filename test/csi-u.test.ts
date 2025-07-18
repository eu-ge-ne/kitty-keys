import type { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("ESC", () => {
  const key: Key = {
    name: "ESC",
    code: 27,
  };

  assert_parse_key("\x1b[27u", [key, 5]);

  assert_parse_key("\x1b[27;5u", [{ ...key, ctrl: true }, 7]);
  assert_parse_key("\x1b[27;3u", [{ ...key, alt: true }, 7]);
  assert_parse_key("\x1b[27;2u", [{ ...key, shift: true }, 7]);

  assert_parse_key("\x1b[27;1:1u", [{ ...key, event: "press" }, 9]);
  assert_parse_key("\x1b[27;1:2u", [{ ...key, event: "repeat" }, 9]);
  assert_parse_key("\x1b[27;1:3u", [{ ...key, event: "release" }, 9]);
});
