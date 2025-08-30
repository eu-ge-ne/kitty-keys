import { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("LEFT", () => {
  const key = Key.create({
    name: "LEFT",
    code: 1,
  });

  assert_parse_key("\x1b[1D", [key, 4]);

  assert_parse_key("\x1b[1;5D", [Key.create(key, { ctrl: true }), 6]);
  assert_parse_key("\x1b[1;3D", [Key.create(key, { alt: true }), 6]);
  assert_parse_key("\x1b[1;2D", [Key.create(key, { shift: true }), 6]);

  assert_parse_key("\x1b[1;1:1D", [key, 8]);
  assert_parse_key("\x1b[1;1:2D", [Key.create(key, { event: "repeat" }), 8]);
  assert_parse_key("\x1b[1;1:3D", [Key.create(key, { event: "release" }), 8]);
});
