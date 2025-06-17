import { assertEquals } from "@std/assert";
import { type KeyEvent, parse } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: KeyEvent): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}

Deno.test("INSERT", () => {
  const key = "2~";

  is("\x1b[2~", { key, type: "press" });

  is("\x1b[2;5~", { key, type: "press", ctrl: true });
  is("\x1b[2;3~", { key, type: "press", alt: true });
  is("\x1b[2;2~", { key, type: "press", shift: true });
  is("\x1b[2;65~", { key, type: "press", caps_lock: true });

  is("\x1b[2;1:1~", { key, type: "press" });
  is("\x1b[2;1:2~", { key, type: "repeat" });
  is("\x1b[2;1:3~", { key, type: "release" });
});

Deno.test("DELETE", () => {
  const key = "3~";

  is("\x1b[3~", { key, type: "press" });

  is("\x1b[3;5~", { key, type: "press", ctrl: true });
  is("\x1b[3;3~", { key, type: "press", alt: true });
  is("\x1b[3;2~", { key, type: "press", shift: true });
  is("\x1b[3;65~", { key, type: "press", caps_lock: true });

  is("\x1b[3;1:1~", { key, type: "press" });
  is("\x1b[3;1:2~", { key, type: "repeat" });
  is("\x1b[3;1:3~", { key, type: "release" });
});

Deno.test("PAGE_UP", () => {
  const key = "5~";

  is("\x1b[5~", { key, type: "press" });

  is("\x1b[5;5~", { key, type: "press", ctrl: true });
  is("\x1b[5;3~", { key, type: "press", alt: true });
  is("\x1b[5;2~", { key, type: "press", shift: true });
  is("\x1b[5;65~", { key, type: "press", caps_lock: true });

  is("\x1b[5;1:1~", { key, type: "press" });
  is("\x1b[5;1:2~", { key, type: "repeat" });
  is("\x1b[5;1:3~", { key, type: "release" });
});

Deno.test("PAGE_DOWN", () => {
  const key = "6~";

  is("\x1b[6~", { key, type: "press" });

  is("\x1b[6;5~", { key, type: "press", ctrl: true });
  is("\x1b[6;3~", { key, type: "press", alt: true });
  is("\x1b[6;2~", { key, type: "press", shift: true });
  is("\x1b[6;65~", { key, type: "press", caps_lock: true });

  is("\x1b[6;1:1~", { key, type: "press" });
  is("\x1b[6;1:2~", { key, type: "repeat" });
  is("\x1b[6;1:3~", { key, type: "release" });
});

Deno.test("HOME", () => {
  const key = "7~";

  is("\x1b[7~", { key, type: "press" });

  is("\x1b[7;5~", { key, type: "press", ctrl: true });
  is("\x1b[7;3~", { key, type: "press", alt: true });
  is("\x1b[7;2~", { key, type: "press", shift: true });
  is("\x1b[7;65~", { key, type: "press", caps_lock: true });

  is("\x1b[7;1:1~", { key, type: "press" });
  is("\x1b[7;1:2~", { key, type: "repeat" });
  is("\x1b[7;1:3~", { key, type: "release" });
});

Deno.test("END", () => {
  const key = "8~";

  is("\x1b[8~", { key, type: "press" });

  is("\x1b[8;5~", { key, type: "press", ctrl: true });
  is("\x1b[8;3~", { key, type: "press", alt: true });
  is("\x1b[8;2~", { key, type: "press", shift: true });
  is("\x1b[8;65~", { key, type: "press", caps_lock: true });

  is("\x1b[8;1:1~", { key, type: "press" });
  is("\x1b[8;1:2~", { key, type: "repeat" });
  is("\x1b[8;1:3~", { key, type: "release" });
});

Deno.test("F1", () => {
  const key = "11~";

  is("\x1b[11~", { key, type: "press" });

  is("\x1b[11;5~", { key, type: "press", ctrl: true });
  is("\x1b[11;3~", { key, type: "press", alt: true });
  is("\x1b[11;2~", { key, type: "press", shift: true });
  is("\x1b[11;65~", { key, type: "press", caps_lock: true });

  is("\x1b[11;1:1~", { key, type: "press" });
  is("\x1b[11;1:2~", { key, type: "repeat" });
  is("\x1b[11;1:3~", { key, type: "release" });
});

Deno.test("F2", () => {
  const key = "12~";

  is("\x1b[12~", { key, type: "press" });

  is("\x1b[12;5~", { key, type: "press", ctrl: true });
  is("\x1b[12;3~", { key, type: "press", alt: true });
  is("\x1b[12;2~", { key, type: "press", shift: true });
  is("\x1b[12;65~", { key, type: "press", caps_lock: true });

  is("\x1b[12;1:1~", { key, type: "press" });
  is("\x1b[12;1:2~", { key, type: "repeat" });
  is("\x1b[12;1:3~", { key, type: "release" });
});

Deno.test("F3", () => {
  const key = "13~";

  is("\x1b[13~", { key, type: "press" });

  is("\x1b[13;5~", { key, type: "press", ctrl: true });
  is("\x1b[13;3~", { key, type: "press", alt: true });
  is("\x1b[13;2~", { key, type: "press", shift: true });
  is("\x1b[13;65~", { key, type: "press", caps_lock: true });

  is("\x1b[13;1:1~", { key, type: "press" });
  is("\x1b[13;1:2~", { key, type: "repeat" });
  is("\x1b[13;1:3~", { key, type: "release" });
});

Deno.test("F5", () => {
  const key = "15~";

  is("\x1b[15~", { key, type: "press" });

  is("\x1b[15;5~", { key, type: "press", ctrl: true });
  is("\x1b[15;3~", { key, type: "press", alt: true });
  is("\x1b[15;2~", { key, type: "press", shift: true });
  is("\x1b[15;65~", { key, type: "press", caps_lock: true });

  is("\x1b[15;1:1~", { key, type: "press" });
  is("\x1b[15;1:2~", { key, type: "repeat" });
  is("\x1b[15;1:3~", { key, type: "release" });
});
