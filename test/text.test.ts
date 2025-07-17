import type { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("a", () => {
  const key: Key = {
    name: "a",
    code: 97,
  };

  assert_parse_key("\x1b[97;;97u", [{ ...key, text: "a" }, 0, 9]);

  assert_parse_key("\x1b[97;3u", [{ ...key, alt: true }, 0, 7]);
  assert_parse_key("\x1b[97;5u", [{ ...key, ctrl: true }, 0, 7]);
  assert_parse_key("\x1b[97;9u", [{ ...key, super: true }, 0, 7]);
  assert_parse_key("\x1b[97;65u", [{ ...key, caps_lock: true }, 0, 8]);
  assert_parse_key("\x1b[97;129u", [{ ...key, num_lock: true }, 0, 9]);

  assert_parse_key("\x1b[97;1:1u", [{ ...key, event: "press" }, 0, 9]);
  assert_parse_key("\x1b[97;1:2u", [{ ...key, event: "repeat" }, 0, 9]);
  assert_parse_key("\x1b[97;1:3u", [{ ...key, event: "release" }, 0, 9]);
});

Deno.test("A", () => {
  assert_parse_key("\x1b[97:65;2;65u", [
    {
      name: "a",
      code: 97,
      shifted_code: 65,
      text: "A",
      shift: true,
    },
    0,
    13,
  ]);
});
