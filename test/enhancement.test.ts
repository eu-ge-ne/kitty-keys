import { is } from "./utils.ts";

Deno.test("1 + 2 + 4 + 8 + 16 (all)", () => {
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

Deno.test("1 + 4 + 8 + 16 (no events)", () => {
  is("\x1b[1078:1046:59;2;1046u", {
    key: "ж",
    event: "press",
    shift_key: "Ж",
    base_key: ";",
    text: "Ж",
    shift: true,
  });
});

Deno.test("1 + 4 + 8 (no events, text)", () => {
  is("\x1b[1078:1046:59;2u", {
    key: "ж",
    event: "press",
    shift_key: "Ж",
    base_key: ";",
    shift: true,
  });
});
