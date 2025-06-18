import { is, is_text } from "./utils.ts";

Deno.test("Disambiguate escape codes", () => {
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

Deno.test("1 + Report alternate keys", () => {
});

Deno.test("1 + 2 + 4 + 8 + 16", () => {
  is("\x1b[1078:1046:59;2;1046u", {
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

Deno.test("no event", () => {
  is("\x1b[1078:1046:59;2;1046u", {
    key: "ж",
    event: "press",
    shift_key: "Ж",
    base_key: ";",
    text: "Ж",
    shift: true,
  });
});

Deno.test("no event, no text", () => {
  is("\x1b[1078:1046:59;2u", {
    key: "ж",
    event: "press",
    shift_key: "Ж",
    base_key: ";",
    shift: true,
  });
});

Deno.test("no event, no text, no alter", () => {
  is("\x1b[1078;2u", {
    key: "ж",
    event: "press",
    shift: true,
  });
});
