import { assert_parse_key } from "./assert.ts";

Deno.test("a", () => {
  assert_parse_key("a", ["a", 1]);
});
