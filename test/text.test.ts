import { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("a", () => {
  const key = Key.create({
    name: "a",
    code: 97,
  });

  assert_parse_key("\x1b[97;;97u", [Key.create(key, { text: "a" }), 9]);

  assert_parse_key("\x1b[97;3u", [Key.create(key, { alt: true }), 7]);
  assert_parse_key("\x1b[97;5u", [Key.create(key, { ctrl: true }), 7]);
  assert_parse_key("\x1b[97;9u", [Key.create(key, { super: true }), 7]);
  assert_parse_key("\x1b[97;65u", [Key.create(key, { caps_lock: true }), 8]);
  assert_parse_key("\x1b[97;129u", [Key.create(key, { num_lock: true }), 9]);

  assert_parse_key("\x1b[97;1:1u", [key, 9]);
  assert_parse_key("\x1b[97;1:2u", [Key.create(key, { event: "repeat" }), 9]);
  assert_parse_key("\x1b[97;1:3u", [Key.create(key, { event: "release" }), 9]);
});

Deno.test("A", () => {
  assert_parse_key("\x1b[97:65;2;65u", [
    Key.create({
      name: "a",
      code: 97,
      shift_code: 65,
      base_code: undefined,
      event: "press",
      text: "A",
      shift: true,
      alt: false,
      ctrl: false,
      super: false,
      caps_lock: false,
      num_lock: false,
    }),
    13,
  ]);
});
