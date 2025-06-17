import { new_key } from "../src/key.ts";
import { is } from "./utils.ts";

Deno.test("ESC", () => {
  is("\x1b[27;1:1u", new_key("ESC", {}, "press"));
  is("\x1b[27;1:2u", new_key("ESC", {}, "repeat"));
  is("\x1b[27;1:3u", new_key("ESC", {}, "release"));
});

Deno.test("ENTER", () => {
  is("\x1b[13;1:1u", new_key("ENTER", {}, "press"));
  is("\x1b[13;1:2u", new_key("ENTER", {}, "repeat"));
  is("\x1b[13;1:3u", new_key("ENTER", {}, "release"));
});

Deno.test("TAB", () => {
  is("\x1b[9;1:1u", new_key("TAB", {}, "press"));
  is("\x1b[9;1:2u", new_key("TAB", {}, "repeat"));
  is("\x1b[9;1:3u", new_key("TAB", {}, "release"));
});

Deno.test("BACKSPACE", () => {
  is("\x1b[127;1:1u", new_key("BACKSPACE", {}, "press"));
  is("\x1b[127;1:2u", new_key("BACKSPACE", {}, "repeat"));
  is("\x1b[127;1:3u", new_key("BACKSPACE", {}, "release"));
});

Deno.test("INSERT", () => {
  is("\x1b[2;1:1~", new_key("INSERT", {}, "press"));
  is("\x1b[2;1:2~", new_key("INSERT", {}, "repeat"));
  is("\x1b[2;1:3~", new_key("INSERT", {}, "release"));
});
