import { assertEquals } from "@std/assert";

import { type Key, new_key } from "../src/key.ts";
import { parse } from "../src/parse.ts";

const encoder = new TextEncoder();

function is(actual: string, expected: string | Key): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}

Deno.test("ESC", () => {
  is("\x1b[27u", new_key("ESC"));

  is("\x1b[27;5u", new_key("ESC", { ctrl: true }));
  is("\x1b[27;3u", new_key("ESC", { alt: true }));
  is("\x1b[27;2u", new_key("ESC", { shift: true }));
  is("\x1b[27;65u", new_key("ESC", { caps_lock: true }));
});

Deno.test("ENTER", () => {
  is("\x0d", "\r");

  is("\x1b[13u", new_key("ENTER"));

  is("\x1b[13;5u", new_key("ENTER", { ctrl: true }));
  is("\x1b[13;3u", new_key("ENTER", { alt: true }));
  is("\x1b[13;2u", new_key("ENTER", { shift: true }));
  is("\x1b[13;65u", new_key("ENTER", { caps_lock: true }));
});

Deno.test("TAB", () => {
  is("\x09", "\t");

  is("\x1b[9u", new_key("TAB"));

  is("\x1b[9;5u", new_key("TAB", { ctrl: true }));
  is("\x1b[9;3u", new_key("TAB", { alt: true }));
  is("\x1b[9;2u", new_key("TAB", { shift: true }));
  is("\x1b[9;65u", new_key("TAB", { caps_lock: true }));
});

Deno.test("BACKSPACE", () => {
  is("\x7f", "\x7f");
  is("\x08", "\x08");

  is("\x1b[127u", new_key("BACKSPACE"));

  is("\x1b[127;5u", new_key("BACKSPACE", { ctrl: true }));
  is("\x1b[127;3u", new_key("BACKSPACE", { alt: true }));
  is("\x1b[127;2u", new_key("BACKSPACE", { shift: true }));
  is("\x1b[127;65u", new_key("BACKSPACE", { caps_lock: true }));
});

Deno.test("INSERT", () => {
  is("\x1b[2~", new_key("INSERT"));

  is("\x1b[2;5u~", new_key("INSERT", { ctrl: true }));
  is("\x1b[2;3u~", new_key("INSERT", { alt: true }));
  is("\x1b[2;2u~", new_key("INSERT", { shift: true }));
  is("\x1b[2;65u~", new_key("INSERT", { caps_lock: true }));
});

Deno.test("DELETE", () => {
  is("\x1b[3~", new_key("DELETE"));

  is("\x1b[3;5u~", new_key("DELETE", { ctrl: true }));
  is("\x1b[3;3u~", new_key("DELETE", { alt: true }));
  is("\x1b[3;2u~", new_key("DELETE", { shift: true }));
  is("\x1b[3;65u~", new_key("DELETE", { caps_lock: true }));
});

Deno.test("LEFT-RIGHT", () => {
  is("\x1b[D", new_key("LEFT"));
  is("\x1b[C", new_key("RIGHT"));

  is("\x1b[1;5D", new_key("LEFT", { ctrl: true }));
  is("\x1b[1;5C", new_key("RIGHT", { ctrl: true }));

  is("\x1b[1;3D", new_key("LEFT", { alt: true }));
  is("\x1b[1;3C", new_key("RIGHT", { alt: true }));

  is("\x1b[1;2D", new_key("LEFT", { shift: true }));
  is("\x1b[1;2C", new_key("RIGHT", { shift: true }));

  is("\x1b[1;65D", new_key("LEFT", { caps_lock: true }));
  is("\x1b[1;65C", new_key("RIGHT", { caps_lock: true }));
});

Deno.test("UP-DOWN", () => {
  is("\x1b[A", new_key("UP"));
  is("\x1b[B", new_key("DOWN"));

  is("\x1b[1;5A", new_key("UP", { ctrl: true }));
  is("\x1b[1;5B", new_key("DOWN", { ctrl: true }));

  is("\x1b[1;3A", new_key("UP", { alt: true }));
  is("\x1b[1;3B", new_key("DOWN", { alt: true }));

  is("\x1b[1;2A", new_key("UP", { shift: true }));
  is("\x1b[1;2B", new_key("DOWN", { shift: true }));

  is("\x1b[1;65A", new_key("UP", { caps_lock: true }));
  is("\x1b[1;65B", new_key("DOWN", { caps_lock: true }));
});

Deno.test("PAGE_UP-PAGE_DOWN", () => {
  is("\x1b[5~", new_key("PAGE_UP"));
  is("\x1b[6~", new_key("PAGE_DOWN"));

  is("\x1b[5;5~", new_key("PAGE_UP", { ctrl: true }));
  is("\x1b[6;5~", new_key("PAGE_DOWN", { ctrl: true }));

  is("\x1b[5;3~", new_key("PAGE_UP", { alt: true }));
  is("\x1b[6;3~", new_key("PAGE_DOWN", { alt: true }));

  is("\x1b[5;2~", new_key("PAGE_UP", { shift: true }));
  is("\x1b[6;2~", new_key("PAGE_DOWN", { shift: true }));

  is("\x1b[5;65~", new_key("PAGE_UP", { caps_lock: true }));
  is("\x1b[6;65~", new_key("PAGE_DOWN", { caps_lock: true }));
});

Deno.test("HOME-END", () => {
  is("\x1b[H", new_key("HOME"));
  is("\x1b[7~", new_key("HOME"));

  is("\x1b[F", new_key("END"));
  is("\x1b[8~", new_key("END"));

  is("\x1b[7;5~", new_key("HOME", { ctrl: true }));
  is("\x1b[8;5~", new_key("END", { ctrl: true }));

  is("\x1b[7;3~", new_key("HOME", { alt: true }));
  is("\x1b[8;3~", new_key("END", { alt: true }));

  is("\x1b[7;2~", new_key("HOME", { shift: true }));
  is("\x1b[8;2~", new_key("END", { shift: true }));

  is("\x1b[7;65~", new_key("HOME", { caps_lock: true }));
  is("\x1b[8;65~", new_key("END", { caps_lock: true }));
});

Deno.test("F1-F12", () => {
  is("\x1b[P", new_key("F1"));
  is("\x1b[11~", new_key("F1"));

  is("\x1b[Q", new_key("F2"));
  is("\x1b[12~", new_key("F2"));

  is("\x1b[13~", new_key("F3"));

  is("\x1b[S", new_key("F4"));
  is("\x1b[14~", new_key("F4"));

  is("\x1b[15~", new_key("F5"));
  is("\x1b[17~", new_key("F6"));
  is("\x1b[18~", new_key("F7"));
  is("\x1b[19~", new_key("F8"));
  is("\x1b[20~", new_key("F9"));
  is("\x1b[21~", new_key("F10"));
  is("\x1b[23~", new_key("F11"));
  is("\x1b[24~", new_key("F12"));

  is("\x1b[1;5Q", new_key("F2", { ctrl: true }));

  is("\x1b[1;3P", new_key("F1", { alt: true }));

  is("\x1b[13;2~", new_key("F3", { shift: true }));

  is("\x1b[1;65S", new_key("F4", { caps_lock: true }));
});
