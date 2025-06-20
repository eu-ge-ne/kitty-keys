import type { Key } from "../src/mod.ts";

import { assert_parse_key } from "./assert.ts";

Deno.test("INSERT", () => {
  const key: Key = { key: "2~", event: "press", name: "INSERT" };

  assert_parse_key("\x1b[2~", key);

  assert_parse_key("\x1b[2;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[2;3~", { ...key, alt: true });
  assert_parse_key("\x1b[2;2~", { ...key, shift: true });

  assert_parse_key("\x1b[2;1:1~", key);
  assert_parse_key("\x1b[2;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[2;1:3~", { ...key, event: "release" });
});

Deno.test("DELETE", () => {
  const key: Key = { key: "3~", event: "press", name: "DELETE" };

  assert_parse_key("\x1b[3~", key);

  assert_parse_key("\x1b[3;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[3;3~", { ...key, alt: true });
  assert_parse_key("\x1b[3;2~", { ...key, shift: true });

  assert_parse_key("\x1b[3;1:1~", key);
  assert_parse_key("\x1b[3;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[3;1:3~", { ...key, event: "release" });
});

Deno.test("PAGE_UP", () => {
  const key: Key = { key: "5~", event: "press", name: "PAGE_UP" };

  assert_parse_key("\x1b[5~", key);

  assert_parse_key("\x1b[5;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[5;3~", { ...key, alt: true });
  assert_parse_key("\x1b[5;2~", { ...key, shift: true });

  assert_parse_key("\x1b[5;1:1~", key);
  assert_parse_key("\x1b[5;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[5;1:3~", { ...key, event: "release" });
});

Deno.test("PAGE_DOWN", () => {
  const key: Key = { key: "6~", event: "press", name: "PAGE_DOWN" };

  assert_parse_key("\x1b[6~", key);

  assert_parse_key("\x1b[6;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[6;3~", { ...key, alt: true });
  assert_parse_key("\x1b[6;2~", { ...key, shift: true });

  assert_parse_key("\x1b[6;1:1~", key);
  assert_parse_key("\x1b[6;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[6;1:3~", { ...key, event: "release" });
});

Deno.test("HOME", () => {
  const key: Key = { key: "7~", event: "press", name: "HOME" };

  assert_parse_key("\x1b[7~", key);

  assert_parse_key("\x1b[7;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[7;3~", { ...key, alt: true });
  assert_parse_key("\x1b[7;2~", { ...key, shift: true });

  assert_parse_key("\x1b[7;1:1~", key);
  assert_parse_key("\x1b[7;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[7;1:3~", { ...key, event: "release" });
});

Deno.test("END", () => {
  const key: Key = { key: "8~", event: "press", name: "END" };

  assert_parse_key("\x1b[8~", key);

  assert_parse_key("\x1b[8;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[8;3~", { ...key, alt: true });
  assert_parse_key("\x1b[8;2~", { ...key, shift: true });

  assert_parse_key("\x1b[8;1:1~", key);
  assert_parse_key("\x1b[8;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[8;1:3~", { ...key, event: "release" });
});

Deno.test("F1", () => {
  const key: Key = { key: "11~", event: "press", name: "F1" };

  assert_parse_key("\x1b[11~", key);

  assert_parse_key("\x1b[11;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[11;3~", { ...key, alt: true });
  assert_parse_key("\x1b[11;2~", { ...key, shift: true });

  assert_parse_key("\x1b[11;1:1~", key);
  assert_parse_key("\x1b[11;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[11;1:3~", { ...key, event: "release" });
});

Deno.test("F2", () => {
  const key: Key = { key: "12~", event: "press", name: "F2" };

  assert_parse_key("\x1b[12~", key);

  assert_parse_key("\x1b[12;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[12;3~", { ...key, alt: true });
  assert_parse_key("\x1b[12;2~", { ...key, shift: true });

  assert_parse_key("\x1b[12;1:1~", key);
  assert_parse_key("\x1b[12;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[12;1:3~", { ...key, event: "release" });
});

Deno.test("F3", () => {
  const key: Key = { key: "13~", event: "press", name: "F3" };

  assert_parse_key("\x1b[13~", key);

  assert_parse_key("\x1b[13;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[13;3~", { ...key, alt: true });
  assert_parse_key("\x1b[13;2~", { ...key, shift: true });

  assert_parse_key("\x1b[13;1:1~", key);
  assert_parse_key("\x1b[13;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[13;1:3~", { ...key, event: "release" });
});

Deno.test("F4", () => {
  const key: Key = { key: "14~", event: "press", name: "F4" };

  assert_parse_key("\x1b[14~", key);

  assert_parse_key("\x1b[14;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[14;3~", { ...key, alt: true });
  assert_parse_key("\x1b[14;2~", { ...key, shift: true });

  assert_parse_key("\x1b[14;1:1~", key);
  assert_parse_key("\x1b[14;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[14;1:3~", { ...key, event: "release" });
});

Deno.test("F5", () => {
  const key: Key = { key: "15~", event: "press", name: "F5" };

  assert_parse_key("\x1b[15~", key);

  assert_parse_key("\x1b[15;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[15;3~", { ...key, alt: true });
  assert_parse_key("\x1b[15;2~", { ...key, shift: true });

  assert_parse_key("\x1b[15;1:1~", key);
  assert_parse_key("\x1b[15;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[15;1:3~", { ...key, event: "release" });
});

Deno.test("F6", () => {
  const key: Key = { key: "17~", event: "press", name: "F6" };

  assert_parse_key("\x1b[17~", key);

  assert_parse_key("\x1b[17;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[17;3~", { ...key, alt: true });
  assert_parse_key("\x1b[17;2~", { ...key, shift: true });

  assert_parse_key("\x1b[17;1:1~", key);
  assert_parse_key("\x1b[17;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[17;1:3~", { ...key, event: "release" });
});

Deno.test("F7", () => {
  const key: Key = { key: "18~", event: "press", name: "F7" };

  assert_parse_key("\x1b[18~", key);

  assert_parse_key("\x1b[18;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[18;3~", { ...key, alt: true });
  assert_parse_key("\x1b[18;2~", { ...key, shift: true });

  assert_parse_key("\x1b[18;1:1~", key);
  assert_parse_key("\x1b[18;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[18;1:3~", { ...key, event: "release" });
});

Deno.test("F8", () => {
  const key: Key = { key: "19~", event: "press", name: "F8" };

  assert_parse_key("\x1b[19~", key);

  assert_parse_key("\x1b[19;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[19;3~", { ...key, alt: true });
  assert_parse_key("\x1b[19;2~", { ...key, shift: true });

  assert_parse_key("\x1b[19;1:1~", key);
  assert_parse_key("\x1b[19;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[19;1:3~", { ...key, event: "release" });
});

Deno.test("F9", () => {
  const key: Key = { key: "20~", event: "press", name: "F9" };

  assert_parse_key("\x1b[20~", key);

  assert_parse_key("\x1b[20;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[20;3~", { ...key, alt: true });
  assert_parse_key("\x1b[20;2~", { ...key, shift: true });

  assert_parse_key("\x1b[20;1:1~", key);
  assert_parse_key("\x1b[20;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[20;1:3~", { ...key, event: "release" });
});

Deno.test("F10", () => {
  const key: Key = { key: "21~", event: "press", name: "F10" };

  assert_parse_key("\x1b[21~", key);

  assert_parse_key("\x1b[21;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[21;3~", { ...key, alt: true });
  assert_parse_key("\x1b[21;2~", { ...key, shift: true });

  assert_parse_key("\x1b[21;1:1~", key);
  assert_parse_key("\x1b[21;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[21;1:3~", { ...key, event: "release" });
});

Deno.test("F11", () => {
  const key: Key = { key: "23~", event: "press", name: "F11" };

  assert_parse_key("\x1b[23~", key);

  assert_parse_key("\x1b[23;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[23;3~", { ...key, alt: true });
  assert_parse_key("\x1b[23;2~", { ...key, shift: true });

  assert_parse_key("\x1b[23;1:1~", key);
  assert_parse_key("\x1b[23;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[23;1:3~", { ...key, event: "release" });
});

Deno.test("F12", () => {
  const key: Key = { key: "24~", event: "press", name: "F12" };

  assert_parse_key("\x1b[24~", key);

  assert_parse_key("\x1b[24;5~", { ...key, ctrl: true });
  assert_parse_key("\x1b[24;3~", { ...key, alt: true });
  assert_parse_key("\x1b[24;2~", { ...key, shift: true });

  assert_parse_key("\x1b[24;1:1~", key);
  assert_parse_key("\x1b[24;1:2~", { ...key, event: "repeat" });
  assert_parse_key("\x1b[24;1:3~", { ...key, event: "release" });
});
