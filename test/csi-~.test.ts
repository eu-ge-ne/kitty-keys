import { assertEquals } from "@std/assert";
import { type Key, parse_key } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: Key): void {
  assertEquals(parse_key(encoder.encode(actual)), expected);
}

Deno.test("INSERT", () => {
  const key: Key = { key: "2~", event: "press", name: "INSERT" };

  is("\x1b[2~", key);

  is("\x1b[2;5~", { ...key, ctrl: true });
  is("\x1b[2;3~", { ...key, alt: true });
  is("\x1b[2;2~", { ...key, shift: true });
  is("\x1b[2;65~", { ...key, caps_lock: true });

  is("\x1b[2;1:1~", key);
  is("\x1b[2;1:2~", { ...key, event: "repeat" });
  is("\x1b[2;1:3~", { ...key, event: "release" });
});

Deno.test("DELETE", () => {
  const key: Key = { key: "3~", event: "press", name: "DELETE" };

  is("\x1b[3~", key);

  is("\x1b[3;5~", { ...key, ctrl: true });
  is("\x1b[3;3~", { ...key, alt: true });
  is("\x1b[3;2~", { ...key, shift: true });
  is("\x1b[3;65~", { ...key, caps_lock: true });

  is("\x1b[3;1:1~", key);
  is("\x1b[3;1:2~", { ...key, event: "repeat" });
  is("\x1b[3;1:3~", { ...key, event: "release" });
});

Deno.test("PAGE_UP", () => {
  const key: Key = { key: "5~", event: "press", name: "PAGE_UP" };

  is("\x1b[5~", key);

  is("\x1b[5;5~", { ...key, ctrl: true });
  is("\x1b[5;3~", { ...key, alt: true });
  is("\x1b[5;2~", { ...key, shift: true });
  is("\x1b[5;65~", { ...key, caps_lock: true });

  is("\x1b[5;1:1~", key);
  is("\x1b[5;1:2~", { ...key, event: "repeat" });
  is("\x1b[5;1:3~", { ...key, event: "release" });
});

Deno.test("PAGE_DOWN", () => {
  const key: Key = { key: "6~", event: "press", name: "PAGE_DOWN" };

  is("\x1b[6~", key);

  is("\x1b[6;5~", { ...key, ctrl: true });
  is("\x1b[6;3~", { ...key, alt: true });
  is("\x1b[6;2~", { ...key, shift: true });
  is("\x1b[6;65~", { ...key, caps_lock: true });

  is("\x1b[6;1:1~", key);
  is("\x1b[6;1:2~", { ...key, event: "repeat" });
  is("\x1b[6;1:3~", { ...key, event: "release" });
});

Deno.test("HOME", () => {
  const key: Key = { key: "7~", event: "press", name: "HOME" };

  is("\x1b[7~", key);

  is("\x1b[7;5~", { ...key, ctrl: true });
  is("\x1b[7;3~", { ...key, alt: true });
  is("\x1b[7;2~", { ...key, shift: true });
  is("\x1b[7;65~", { ...key, caps_lock: true });

  is("\x1b[7;1:1~", key);
  is("\x1b[7;1:2~", { ...key, event: "repeat" });
  is("\x1b[7;1:3~", { ...key, event: "release" });
});

Deno.test("END", () => {
  const key: Key = { key: "8~", event: "press", name: "END" };

  is("\x1b[8~", key);

  is("\x1b[8;5~", { ...key, ctrl: true });
  is("\x1b[8;3~", { ...key, alt: true });
  is("\x1b[8;2~", { ...key, shift: true });
  is("\x1b[8;65~", { ...key, caps_lock: true });

  is("\x1b[8;1:1~", key);
  is("\x1b[8;1:2~", { ...key, event: "repeat" });
  is("\x1b[8;1:3~", { ...key, event: "release" });
});

Deno.test("F1", () => {
  const key: Key = { key: "11~", event: "press", name: "F1" };

  is("\x1b[11~", key);

  is("\x1b[11;5~", { ...key, ctrl: true });
  is("\x1b[11;3~", { ...key, alt: true });
  is("\x1b[11;2~", { ...key, shift: true });
  is("\x1b[11;65~", { ...key, caps_lock: true });

  is("\x1b[11;1:1~", key);
  is("\x1b[11;1:2~", { ...key, event: "repeat" });
  is("\x1b[11;1:3~", { ...key, event: "release" });
});

Deno.test("F2", () => {
  const key: Key = { key: "12~", event: "press", name: "F2" };

  is("\x1b[12~", key);

  is("\x1b[12;5~", { ...key, ctrl: true });
  is("\x1b[12;3~", { ...key, alt: true });
  is("\x1b[12;2~", { ...key, shift: true });
  is("\x1b[12;65~", { ...key, caps_lock: true });

  is("\x1b[12;1:1~", key);
  is("\x1b[12;1:2~", { ...key, event: "repeat" });
  is("\x1b[12;1:3~", { ...key, event: "release" });
});

Deno.test("F3", () => {
  const key: Key = { key: "13~", event: "press", name: "F3" };

  is("\x1b[13~", key);

  is("\x1b[13;5~", { ...key, ctrl: true });
  is("\x1b[13;3~", { ...key, alt: true });
  is("\x1b[13;2~", { ...key, shift: true });
  is("\x1b[13;65~", { ...key, caps_lock: true });

  is("\x1b[13;1:1~", key);
  is("\x1b[13;1:2~", { ...key, event: "repeat" });
  is("\x1b[13;1:3~", { ...key, event: "release" });
});

Deno.test("F4", () => {
  const key: Key = { key: "14~", event: "press", name: "F4" };

  is("\x1b[14~", key);

  is("\x1b[14;5~", { ...key, ctrl: true });
  is("\x1b[14;3~", { ...key, alt: true });
  is("\x1b[14;2~", { ...key, shift: true });
  is("\x1b[14;65~", { ...key, caps_lock: true });

  is("\x1b[14;1:1~", key);
  is("\x1b[14;1:2~", { ...key, event: "repeat" });
  is("\x1b[14;1:3~", { ...key, event: "release" });
});

Deno.test("F5", () => {
  const key: Key = { key: "15~", event: "press", name: "F5" };

  is("\x1b[15~", key);

  is("\x1b[15;5~", { ...key, ctrl: true });
  is("\x1b[15;3~", { ...key, alt: true });
  is("\x1b[15;2~", { ...key, shift: true });
  is("\x1b[15;65~", { ...key, caps_lock: true });

  is("\x1b[15;1:1~", key);
  is("\x1b[15;1:2~", { ...key, event: "repeat" });
  is("\x1b[15;1:3~", { ...key, event: "release" });
});

Deno.test("F6", () => {
  const key: Key = { key: "17~", event: "press", name: "F6" };

  is("\x1b[17~", key);

  is("\x1b[17;5~", { ...key, ctrl: true });
  is("\x1b[17;3~", { ...key, alt: true });
  is("\x1b[17;2~", { ...key, shift: true });
  is("\x1b[17;65~", { ...key, caps_lock: true });

  is("\x1b[17;1:1~", key);
  is("\x1b[17;1:2~", { ...key, event: "repeat" });
  is("\x1b[17;1:3~", { ...key, event: "release" });
});

Deno.test("F7", () => {
  const key = "18~";

  is("\x1b[18~", { key, event: "press" });

  is("\x1b[18;5~", { key, event: "press", ctrl: true });
  is("\x1b[18;3~", { key, event: "press", alt: true });
  is("\x1b[18;2~", { key, event: "press", shift: true });
  is("\x1b[18;65~", { key, event: "press", caps_lock: true });

  is("\x1b[18;1:1~", { key, event: "press" });
  is("\x1b[18;1:2~", { key, event: "repeat" });
  is("\x1b[18;1:3~", { key, event: "release" });
});

Deno.test("F8", () => {
  const key = "19~";

  is("\x1b[19~", { key, event: "press" });

  is("\x1b[19;5~", { key, event: "press", ctrl: true });
  is("\x1b[19;3~", { key, event: "press", alt: true });
  is("\x1b[19;2~", { key, event: "press", shift: true });
  is("\x1b[19;65~", { key, event: "press", caps_lock: true });

  is("\x1b[19;1:1~", { key, event: "press" });
  is("\x1b[19;1:2~", { key, event: "repeat" });
  is("\x1b[19;1:3~", { key, event: "release" });
});

Deno.test("F9", () => {
  const key = "20~";

  is("\x1b[20~", { key, event: "press" });

  is("\x1b[20;5~", { key, event: "press", ctrl: true });
  is("\x1b[20;3~", { key, event: "press", alt: true });
  is("\x1b[20;2~", { key, event: "press", shift: true });
  is("\x1b[20;65~", { key, event: "press", caps_lock: true });

  is("\x1b[20;1:1~", { key, event: "press" });
  is("\x1b[20;1:2~", { key, event: "repeat" });
  is("\x1b[20;1:3~", { key, event: "release" });
});

Deno.test("F10", () => {
  const key = "21~";

  is("\x1b[21~", { key, event: "press" });

  is("\x1b[21;5~", { key, event: "press", ctrl: true });
  is("\x1b[21;3~", { key, event: "press", alt: true });
  is("\x1b[21;2~", { key, event: "press", shift: true });
  is("\x1b[21;65~", { key, event: "press", caps_lock: true });

  is("\x1b[21;1:1~", { key, event: "press" });
  is("\x1b[21;1:2~", { key, event: "repeat" });
  is("\x1b[21;1:3~", { key, event: "release" });
});

Deno.test("F11", () => {
  const key = "23~";

  is("\x1b[23~", { key, event: "press" });

  is("\x1b[23;5~", { key, event: "press", ctrl: true });
  is("\x1b[23;3~", { key, event: "press", alt: true });
  is("\x1b[23;2~", { key, event: "press", shift: true });
  is("\x1b[23;65~", { key, event: "press", caps_lock: true });

  is("\x1b[23;1:1~", { key, event: "press" });
  is("\x1b[23;1:2~", { key, event: "repeat" });
  is("\x1b[23;1:3~", { key, event: "release" });
});

Deno.test("F12", () => {
  const key = "24~";

  is("\x1b[24~", { key, event: "press" });

  is("\x1b[24;5~", { key, event: "press", ctrl: true });
  is("\x1b[24;3~", { key, event: "press", alt: true });
  is("\x1b[24;2~", { key, event: "press", shift: true });
  is("\x1b[24;65~", { key, event: "press", caps_lock: true });

  is("\x1b[24;1:1~", { key, event: "press" });
  is("\x1b[24;1:2~", { key, event: "repeat" });
  is("\x1b[24;1:3~", { key, event: "release" });
});
