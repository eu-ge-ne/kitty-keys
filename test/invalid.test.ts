import { assert_parse } from "./assert.ts";

Deno.test("CSI ? flags u", () => {
  assert_parse("\x1b[?31u", [undefined, 0]);
});

Deno.test("CSI 1 z", () => {
  assert_parse("\x1b[1z", [undefined, 0]);
});

Deno.test("CSI 1", () => {
  assert_parse("\x1b[1", [undefined, 0]);
});

Deno.test("CSI", () => {
  assert_parse("\x1b[", [undefined, 0]);
});
