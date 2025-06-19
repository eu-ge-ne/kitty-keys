import { is, is_text } from "./utils.ts";

Deno.test("1 Disambiguate escape codes", () => {
  is("\x1b[27u", {
    key: "\x1b",
    event: "press",
    name: "ESC",
  });

  is_text("\r", "\r");
  is_text("\t", "\t");
  is_text("\x7f", "\x7f");

  is_text("Ж", "Ж");

  is("\x1b[1078;8u", {
    key: "ж",
    event: "press",
    shift: true,
    alt: true,
    ctrl: true,
  });
});

Deno.test("1 + 4 Report alternate keys", () => {
  is("\x1b[1078:1046:59;8u", {
    key: "ж",
    event: "press",
    shift_key: "Ж",
    base_key: ";",
    shift: true,
    alt: true,
    ctrl: true,
  });
});

Deno.test("1 + 4 + 8 Report all keys as escape codes", () => {
  is("\x1b[13u", {
    key: "\r",
    event: "press",
    name: "ENTER",
  });

  is("\x1b[9u", {
    key: "\t",
    event: "press",
    name: "TAB",
  });

  is("\x1b[127u", {
    key: "\x7f",
    event: "press",
    name: "BACKSPACE",
  });

  is("\x1b[57444;9u", {
    key: String.fromCodePoint(57444),
    event: "press",
    name: "LEFT_SUPER",
    super: true,
  });

  is("\x1b[1078:1046:59;2u", {
    key: "ж",
    event: "press",
    shift_key: "Ж",
    base_key: ";",
    shift: true,
  });
});

Deno.test("1 + 4 + 8 + 16 Report associated text", () => {
  is("\x1b[1078:1046:59;2;1046u", {
    key: "ж",
    event: "press",
    shift_key: "Ж",
    base_key: ";",
    text: "Ж",
    shift: true,
  });
});

Deno.test("1 + 4 + 8 + 16 + 2 Report event types", () => {
  is("\x1b[1078:1046:59;2;1046u", {
    key: "ж",
    event: "press",
    shift_key: "Ж",
    base_key: ";",
    text: "Ж",
    shift: true,
  });

  is("\x1b[1078:1046:59;2:1;1046u", {
    key: "ж",
    event: "press",
    shift_key: "Ж",
    base_key: ";",
    text: "Ж",
    shift: true,
  });

  is("\x1b[1078:1046:59;2:2;1046u", {
    key: "ж",
    event: "repeat",
    shift_key: "Ж",
    base_key: ";",
    text: "Ж",
    shift: true,
  });

  is("\x1b[1078::59;2:3u", {
    key: "ж",
    event: "release",
    base_key: ";",
    shift: true,
  });
});
