import { new_key } from "../src/key.ts";
import { is } from "./utils.ts";

Deno.test("F1-F12", () => {
  is("\x1b[S", new_key("F4", {}, "press"));
  is("\x1b[14~", new_key("F4", {}, "press"));

  is("\x1b[15~", new_key("F5", {}, "press"));
  is("\x1b[17~", new_key("F6", {}, "press"));
  is("\x1b[18~", new_key("F7", {}, "press"));
  is("\x1b[19~", new_key("F8", {}, "press"));
  is("\x1b[20~", new_key("F9", {}, "press"));
  is("\x1b[21~", new_key("F10", {}, "press"));
  is("\x1b[23~", new_key("F11", {}, "press"));
  is("\x1b[24~", new_key("F12", {}, "press"));

  is("\x1b[1;65S", new_key("F4", { caps_lock: true }, "press"));
});
