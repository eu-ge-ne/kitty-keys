import type { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("a", () => {
  const key: Key = {
    name: "a",
    code: 97,
  };

  assert_parse_key("\x1b[97;;97u", { ...key, text: "a" });

  assert_parse_key("\x1b[97;3u", { ...key, alt: true });
  assert_parse_key("\x1b[97;5u", { ...key, ctrl: true });
  assert_parse_key("\x1b[97;9u", { ...key, super: true });
  assert_parse_key("\x1b[97;65u", { ...key, caps_lock: true });
  assert_parse_key("\x1b[97;129u", { ...key, num_lock: true });

  assert_parse_key("\x1b[97;1:1u", { ...key, event: "press" });
  assert_parse_key("\x1b[97;1:2u", { ...key, event: "repeat" });
  assert_parse_key("\x1b[97;1:3u", { ...key, event: "release" });
});

Deno.test("A", () => {
  assert_parse_key("\x1b[97:65;2;65u", {
    name: "a",
    code: 97,
    shifted_code: 65,
    text: "A",
    shift: true,
  });
});
