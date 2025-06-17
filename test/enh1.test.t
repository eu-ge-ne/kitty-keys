import { new_key } from "../src/key.ts";
import { is } from "./utils.ts";

Deno.test("BACKSPACE", () => {
  is("\x1b[127u", new_key("BACKSPACE", {}, "press"));

  is("\x1b[127;5u", new_key("BACKSPACE", { ctrl: true }, "press"));
  is("\x1b[127;3u", new_key("BACKSPACE", { alt: true }, "press"));
  is("\x1b[127;2u", new_key("BACKSPACE", { shift: true }, "press"));
  is("\x1b[127;65u", new_key("BACKSPACE", { caps_lock: true }, "press"));
});

Deno.test("INSERT", () => {
  is("\x1b[2~", new_key("INSERT", {}, "press"));

  is("\x1b[2;5~", new_key("INSERT", { ctrl: true }, "press"));
  is("\x1b[2;3~", new_key("INSERT", { alt: true }, "press"));
  is("\x1b[2;2~", new_key("INSERT", { shift: true }, "press"));
  is("\x1b[2;65~", new_key("INSERT", { caps_lock: true }, "press"));
});

Deno.test("DELETE", () => {
  is("\x1b[3~", new_key("DELETE", {}, "press"));

  is("\x1b[3;5~", new_key("DELETE", { ctrl: true }, "press"));
  is("\x1b[3;3~", new_key("DELETE", { alt: true }, "press"));
  is("\x1b[3;2~", new_key("DELETE", { shift: true }, "press"));
  is("\x1b[3;65~", new_key("DELETE", { caps_lock: true }, "press"));
});

Deno.test("LEFT-RIGHT", () => {
  is("\x1b[D", new_key("LEFT", {}, "press"));
  is("\x1b[C", new_key("RIGHT", {}, "press"));

  is("\x1b[1;5D", new_key("LEFT", { ctrl: true }, "press"));
  is("\x1b[1;5C", new_key("RIGHT", { ctrl: true }, "press"));

  is("\x1b[1;3D", new_key("LEFT", { alt: true }, "press"));
  is("\x1b[1;3C", new_key("RIGHT", { alt: true }, "press"));

  is("\x1b[1;2D", new_key("LEFT", { shift: true }, "press"));
  is("\x1b[1;2C", new_key("RIGHT", { shift: true }, "press"));

  is("\x1b[1;65D", new_key("LEFT", { caps_lock: true }, "press"));
  is("\x1b[1;65C", new_key("RIGHT", { caps_lock: true }, "press"));
});

Deno.test("UP-DOWN", () => {
  is("\x1b[A", new_key("UP", {}, "press"));
  is("\x1b[B", new_key("DOWN", {}, "press"));

  is("\x1b[1;5A", new_key("UP", { ctrl: true }, "press"));
  is("\x1b[1;5B", new_key("DOWN", { ctrl: true }, "press"));

  is("\x1b[1;3A", new_key("UP", { alt: true }, "press"));
  is("\x1b[1;3B", new_key("DOWN", { alt: true }, "press"));

  is("\x1b[1;2A", new_key("UP", { shift: true }, "press"));
  is("\x1b[1;2B", new_key("DOWN", { shift: true }, "press"));

  is("\x1b[1;65A", new_key("UP", { caps_lock: true }, "press"));
  is("\x1b[1;65B", new_key("DOWN", { caps_lock: true }, "press"));
});

Deno.test("PAGE_UP-PAGE_DOWN", () => {
  is("\x1b[5~", new_key("PAGE_UP", {}, "press"));
  is("\x1b[6~", new_key("PAGE_DOWN", {}, "press"));

  is("\x1b[5;5~", new_key("PAGE_UP", { ctrl: true }, "press"));
  is("\x1b[6;5~", new_key("PAGE_DOWN", { ctrl: true }, "press"));

  is("\x1b[5;3~", new_key("PAGE_UP", { alt: true }, "press"));
  is("\x1b[6;3~", new_key("PAGE_DOWN", { alt: true }, "press"));

  is("\x1b[5;2~", new_key("PAGE_UP", { shift: true }, "press"));
  is("\x1b[6;2~", new_key("PAGE_DOWN", { shift: true }, "press"));

  is("\x1b[5;65~", new_key("PAGE_UP", { caps_lock: true }, "press"));
  is("\x1b[6;65~", new_key("PAGE_DOWN", { caps_lock: true }, "press"));
});

Deno.test("HOME-END", () => {
  is("\x1b[H", new_key("HOME", {}, "press"));
  is("\x1b[7~", new_key("HOME", {}, "press"));

  is("\x1b[F", new_key("END", {}, "press"));
  is("\x1b[8~", new_key("END", {}, "press"));

  is("\x1b[7;5~", new_key("HOME", { ctrl: true }, "press"));
  is("\x1b[8;5~", new_key("END", { ctrl: true }, "press"));

  is("\x1b[7;3~", new_key("HOME", { alt: true }, "press"));
  is("\x1b[8;3~", new_key("END", { alt: true }, "press"));

  is("\x1b[7;2~", new_key("HOME", { shift: true }, "press"));
  is("\x1b[8;2~", new_key("END", { shift: true }, "press"));

  is("\x1b[7;65~", new_key("HOME", { caps_lock: true }, "press"));
  is("\x1b[8;65~", new_key("END", { caps_lock: true }, "press"));
});

Deno.test("F1-F12", () => {
  is("\x1b[P", new_key("F1", {}, "press"));
  is("\x1b[11~", new_key("F1", {}, "press"));

  is("\x1b[Q", new_key("F2", {}, "press"));
  is("\x1b[12~", new_key("F2", {}, "press"));

  is("\x1b[13~", new_key("F3", {}, "press"));

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

  is("\x1b[1;5Q", new_key("F2", { ctrl: true }, "press"));

  is("\x1b[1;3P", new_key("F1", { alt: true }, "press"));

  is("\x1b[13;2~", new_key("F3", { shift: true }, "press"));

  is("\x1b[1;65S", new_key("F4", { caps_lock: true }, "press"));
});
