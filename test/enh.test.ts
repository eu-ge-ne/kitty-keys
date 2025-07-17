import { assert_parse_key } from "./assert.ts";

Deno.test("1 Disambiguate escape codes", () => {
  assert_parse_key("\x1b[27u", [
    {
      name: "ESC",
      code: 27,
    },
    5,
  ]);

  assert_parse_key("\x1b[1078;8u", [
    {
      name: "ж",
      code: 1078,
      shift: true,
      alt: true,
      ctrl: true,
    },
    9,
  ]);
});

Deno.test("1 + 4 Report alternate keys", () => {
  assert_parse_key("\x1b[1078:1046:59;8u", [
    {
      name: "ж",
      code: 1078,
      shifted_code: 1046,
      base_layout_code: 59,
      shift: true,
      alt: true,
      ctrl: true,
    },
    17,
  ]);
});

Deno.test("1 + 4 + 8 Report all keys as escape codes", () => {
  assert_parse_key("\x1b[1078u", [
    {
      name: "ж",
      code: 1078,
    },
    7,
  ]);
});

Deno.test("1 + 4 + 8 + 16 Report associated text", () => {
  assert_parse_key("\x1b[1078:1046:59;2;1046u", [
    {
      name: "ж",
      code: 1078,
      shifted_code: 1046,
      base_layout_code: 59,
      text: "Ж",
      shift: true,
    },
    22,
  ]);
});

Deno.test("1 + 4 + 8 + 16 + 2 Report event types", () => {
  assert_parse_key("\x1b[1078:1046:59;2:1;1046u", [
    {
      name: "ж",
      code: 1078,
      shifted_code: 1046,
      base_layout_code: 59,
      event: "press",
      text: "Ж",
      shift: true,
    },
    24,
  ]);

  assert_parse_key("\x1b[1078:1046:59;2:2;1046u", [
    {
      name: "ж",
      code: 1078,
      shifted_code: 1046,
      base_layout_code: 59,
      event: "repeat",
      text: "Ж",
      shift: true,
    },
    24,
  ]);

  assert_parse_key("\x1b[1078::59;2:3u", [
    {
      name: "ж",
      code: 1078,
      base_layout_code: 59,
      event: "release",
      shift: true,
    },
    15,
  ]);
});
