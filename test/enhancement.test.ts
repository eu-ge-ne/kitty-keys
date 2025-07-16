import { assert_parse_key } from "./assert.ts";

Deno.test("1 Disambiguate escape codes", () => {
  assert_parse_key("\x1b[27u", {
    key: "\x1b",
    event: "press",
    func: "ESC",
    prefix: "\x1b[",
    scheme: "u",
  });

  assert_parse_key("\x1b[1078;8u", {
    key: "ж",
    event: "press",
    shift: true,
    alt: true,
    ctrl: true,
    prefix: "\x1b[",
    scheme: "u",
  });
});

Deno.test("1 + 4 Report alternate keys", () => {
  assert_parse_key("\x1b[1078:1046:59;8u", {
    key: "ж",
    event: "press",
    shift_key: "Ж",
    base_key: ";",
    shift: true,
    alt: true,
    ctrl: true,
    prefix: "\x1b[",
    scheme: "u",
  });
});

Deno.test("1 + 4 + 8 Report all keys as escape codes", () => {
  assert_parse_key("\x1b[13u", {
    key: "\r",
    event: "press",
    func: "ENTER",
    prefix: "\x1b[",
    scheme: "u",
  });

  assert_parse_key("\x1b[9u", {
    key: "\t",
    event: "press",
    func: "TAB",
    prefix: "\x1b[",
    scheme: "u",
  });

  assert_parse_key("\x1b[127u", {
    key: "\x7f",
    event: "press",
    func: "BACKSPACE",
    prefix: "\x1b[",
    scheme: "u",
  });

  assert_parse_key("\x1b[57444;9u", {
    key: String.fromCodePoint(57444),
    event: "press",
    func: "LEFT_SUPER",
    super: true,
    prefix: "\x1b[",
    scheme: "u",
  });

  assert_parse_key("\x1b[1078:1046:59;2u", {
    key: "ж",
    event: "press",
    shift_key: "Ж",
    base_key: ";",
    shift: true,
    prefix: "\x1b[",
    scheme: "u",
  });
});

Deno.test("1 + 4 + 8 + 16 Report associated text", () => {
  assert_parse_key("\x1b[1078:1046:59;2;1046u", {
    key: "ж",
    event: "press",
    shift_key: "Ж",
    base_key: ";",
    text: "Ж",
    shift: true,
    prefix: "\x1b[",
    scheme: "u",
  });
});

Deno.test("1 + 4 + 8 + 16 + 2 Report event types", () => {
  assert_parse_key("\x1b[1078:1046:59;2;1046u", {
    key: "ж",
    event: "press",
    shift_key: "Ж",
    base_key: ";",
    text: "Ж",
    shift: true,
    prefix: "\x1b[",
    scheme: "u",
  });

  assert_parse_key("\x1b[1078:1046:59;2:1;1046u", {
    key: "ж",
    event: "press",
    shift_key: "Ж",
    base_key: ";",
    text: "Ж",
    shift: true,
    prefix: "\x1b[",
    scheme: "u",
  });

  assert_parse_key("\x1b[1078:1046:59;2:2;1046u", {
    key: "ж",
    event: "repeat",
    shift_key: "Ж",
    base_key: ";",
    text: "Ж",
    shift: true,
    prefix: "\x1b[",
    scheme: "u",
  });

  assert_parse_key("\x1b[1078::59;2:3u", {
    key: "ж",
    event: "release",
    base_key: ";",
    shift: true,
    prefix: "\x1b[",
    scheme: "u",
  });
});
