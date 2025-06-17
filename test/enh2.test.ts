import { new_key } from "../src/key.ts";
import { is } from "./utils.ts";

Deno.test("ESC", () => {
  is("\x1b[27;1:1u", new_key("ESC", {}, "press"));
  is("\x1b[27;1:2u", new_key("ESC", {}, "repeat"));
  is("\x1b[27;1:3u", new_key("ESC", {}, "release"));
});
