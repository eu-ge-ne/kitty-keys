import { new_key } from "../src/key.ts";
import { is } from "./utils.ts";

Deno.test("LEFT-RIGHT", () => {
  is("\x1b[1;1:1D", new_key("LEFT", {}, "press"));
  is("\x1b[1;1:1C", new_key("RIGHT", {}, "press"));

  is("\x1b[1;1:2D", new_key("LEFT", {}, "repeat"));
  is("\x1b[1;1:2C", new_key("RIGHT", {}, "repeat"));

  is("\x1b[1;1:3D", new_key("LEFT", {}, "release"));
  is("\x1b[1;1:3C", new_key("RIGHT", {}, "release"));
});
