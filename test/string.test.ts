import { assert_parse } from "./assert.ts";

Deno.test("a", () => {
  assert_parse("a", ["a", 1]);
});
