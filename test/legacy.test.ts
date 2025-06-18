import { is_text } from "./utils.ts";

Deno.test("ENTER", () => {
  is_text("\x0d", "\r");
});

Deno.test("TAB", () => {
  is_text("\x09", "\t");
});

Deno.test("BACKSPACE", () => {
  is_text("\x7f", "\x7f");
  is_text("\x08", "\x08");
});
