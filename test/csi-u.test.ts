import { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("ESC", () => {
  const key = Key.create({
    name: "ESC",
    code: 27,
  });

  assert_parse_key("\x1b[27u", [key, 5]);

  assert_parse_key("\x1b[27;5u", [Key.create(key, { ctrl: true }), 7]);
  assert_parse_key("\x1b[27;3u", [Key.create(key, { alt: true }), 7]);
  assert_parse_key("\x1b[27;2u", [Key.create(key, { shift: true }), 7]);

  assert_parse_key("\x1b[27;1:1u", [key, 9]);
  assert_parse_key("\x1b[27;1:2u", [Key.create(key, { event: "repeat" }), 9]);
  assert_parse_key("\x1b[27;1:3u", [Key.create(key, { event: "release" }), 9]);
});
