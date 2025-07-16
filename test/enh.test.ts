import { assert_parse_key } from "./assert.ts";

Deno.test("1 Disambiguate escape codes", () => {
  assert_parse_key("\x1b[27u", {
    name: "ESC",

    code: 27,
    shifted_code: undefined,
    base_layout_code: undefined,
    event: "press",
    text: undefined,

    shift: false,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
  });

  assert_parse_key("\x1b[1078;8u", {
    name: "\x1b[1078u",

    code: 1078,
    shifted_code: undefined,
    base_layout_code: undefined,
    event: "press",
    text: undefined,

    shift: true,
    alt: true,
    ctrl: true,
    super: false,
    caps_lock: false,
    num_lock: false,
  });
});

Deno.test("1 + 4 Report alternate keys", () => {
  assert_parse_key("\x1b[1078:1046:59;8u", {
    name: "\x1b[1078u",

    code: 1078,
    shifted_code: 1046,
    base_layout_code: 59,
    event: "press",
    text: undefined,

    shift: true,
    alt: true,
    ctrl: true,
    super: false,
    caps_lock: false,
    num_lock: false,
  });
});

Deno.test("1 + 4 + 8 Report all keys as escape codes", () => {
  assert_parse_key("\x1b[13u", {
    name: "ENTER",

    code: 13,
    shifted_code: undefined,
    base_layout_code: undefined,
    event: "press",
    text: undefined,

    shift: false,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
  });

  assert_parse_key("\x1b[9u", {
    name: "TAB",

    code: 9,
    shifted_code: undefined,
    base_layout_code: undefined,
    event: "press",
    text: undefined,

    shift: false,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
  });

  assert_parse_key("\x1b[127u", {
    name: "BACKSPACE",

    code: 127,
    shifted_code: undefined,
    base_layout_code: undefined,
    event: "press",
    text: undefined,

    shift: false,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
  });

  assert_parse_key("\x1b[57444;9u", {
    name: "LEFT_SUPER",

    code: 57444,
    shifted_code: undefined,
    base_layout_code: undefined,
    event: "press",
    text: undefined,

    shift: false,
    alt: false,
    ctrl: false,
    super: true,
    caps_lock: false,
    num_lock: false,
  });

  assert_parse_key("\x1b[1078:1046:59;2u", {
    name: "\x1b[1078u",

    code: 1078,
    shifted_code: 1046,
    base_layout_code: 59,
    event: "press",
    text: undefined,

    shift: true,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
  });
});

Deno.test("1 + 4 + 8 + 16 Report associated text", () => {
  assert_parse_key("\x1b[1078:1046:59;2;1046u", {
    name: "\x1b[1078u",

    code: 1078,
    shifted_code: 1046,
    base_layout_code: 59,
    event: "press",
    text: "Ж",

    shift: true,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
  });
});

Deno.test("1 + 4 + 8 + 16 + 2 Report event types", () => {
  assert_parse_key("\x1b[1078:1046:59;2;1046u", {
    name: "\x1b[1078u",

    code: 1078,
    shifted_code: 1046,
    base_layout_code: 59,
    event: "press",
    text: "Ж",

    shift: true,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
  });

  assert_parse_key("\x1b[1078:1046:59;2:1;1046u", {
    name: "\x1b[1078u",

    code: 1078,
    shifted_code: 1046,
    base_layout_code: 59,
    event: "press",
    text: "Ж",

    shift: true,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
  });

  assert_parse_key("\x1b[1078:1046:59;2:2;1046u", {
    name: "\x1b[1078u",

    code: 1078,
    shifted_code: 1046,
    base_layout_code: 59,
    event: "repeat",
    text: "Ж",

    shift: true,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
  });

  assert_parse_key("\x1b[1078::59;2:3u", {
    name: "\x1b[1078u",

    code: 1078,
    shifted_code: undefined,
    base_layout_code: 59,
    event: "release",
    text: undefined,

    shift: true,
    alt: false,
    ctrl: false,
    super: false,
    caps_lock: false,
    num_lock: false,
  });
});
