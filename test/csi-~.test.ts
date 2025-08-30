import { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("INSERT", () => {
  const key = Key.create({
    name: "INSERT",
    code: 2,
  });

  assert_parse_key("\x1b[2~", [key, 4]);

  assert_parse_key("\x1b[2;5~", [Key.create(key, { ctrl: true }), 6]);
  assert_parse_key("\x1b[2;3~", [Key.create(key, { alt: true }), 6]);
  assert_parse_key("\x1b[2;2~", [Key.create(key, { shift: true }), 6]);

  assert_parse_key("\x1b[2;1:1~", [key, 8]);
  assert_parse_key("\x1b[2;1:2~", [Key.create(key, { event: "repeat" }), 8]);
  assert_parse_key("\x1b[2;1:3~", [Key.create(key, { event: "release" }), 8]);
});
