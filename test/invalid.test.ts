import { assert_parse_key } from "./assert.ts";

Deno.test("CSI ? flags u", () => {
  assert_parse_key("\x1b[?31u", undefined);
});

Deno.test("a", () => {
  assert_parse_key("a", undefined);
});

Deno.test("CSI 1 z", () => {
  assert_parse_key("\x1b[1z", undefined);
});

Deno.test("CSI 1", () => {
  assert_parse_key("\x1b[1", undefined);
});

Deno.test("CSI", () => {
  assert_parse_key("\x1b[", undefined);
});
