import { new_key } from "../src/key.ts";
import { is } from "./utils.ts";

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

Deno.test("DELETE", () => {
  is("\x1b[3;1:1~", new_key("DELETE", {}, "press"));
  is("\x1b[3;1:2~", new_key("DELETE", {}, "repeat"));
  is("\x1b[3;1:3~", new_key("DELETE", {}, "release"));
});

Deno.test("LEFT-RIGHT", () => {
  is("\x1b[1;1:1D", new_key("LEFT", {}, "press"));
  is("\x1b[1;1:1C", new_key("RIGHT", {}, "press"));

  is("\x1b[1;1:2D", new_key("LEFT", {}, "repeat"));
  is("\x1b[1;1:2C", new_key("RIGHT", {}, "repeat"));

  is("\x1b[1;1:3D", new_key("LEFT", {}, "release"));
  is("\x1b[1;1:3C", new_key("RIGHT", {}, "release"));
});
