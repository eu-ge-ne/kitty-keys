import { assertEquals } from "@std/assert";
import { type KeyEvent, parse } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: KeyEvent): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}

Deno.test("ESC", () => {
  const key = "\x1b";

  is("\x1b[27u", { key, type: "press" });

  is("\x1b[27;5u", { key, type: "press", ctrl: true });
  is("\x1b[27;3u", { key, type: "press", alt: true });
  is("\x1b[27;2u", { key, type: "press", shift: true });
  is("\x1b[27;65u", { key, type: "press", caps_lock: true });

  is("\x1b[27;1:1u", { key, type: "press" });
  is("\x1b[27;1:2u", { key, type: "repeat" });
  is("\x1b[27;1:3u", { key, type: "release" });
});

Deno.test("ENTER", () => {
  const key = "\r";

  is("\x1b[13u", { key, type: "press" });

  is("\x1b[13;5u", { key, type: "press", ctrl: true });
  is("\x1b[13;3u", { key, type: "press", alt: true });
  is("\x1b[13;2u", { key, type: "press", shift: true });
  is("\x1b[13;65u", { key, type: "press", caps_lock: true });

  is("\x1b[13;1:1u", { key, type: "press" });
  is("\x1b[13;1:2u", { key, type: "repeat" });
  is("\x1b[13;1:3u", { key, type: "release" });
});

Deno.test("TAB", () => {
  const key = "\t";

  is("\x1b[9u", { key, type: "press" });

  is("\x1b[9;5u", { key, type: "press", ctrl: true });
  is("\x1b[9;3u", { key, type: "press", alt: true });
  is("\x1b[9;2u", { key, type: "press", shift: true });
  is("\x1b[9;65u", { key, type: "press", caps_lock: true });

  is("\x1b[9;1:1u", { key, type: "press" });
  is("\x1b[9;1:2u", { key, type: "repeat" });
  is("\x1b[9;1:3u", { key, type: "release" });
});

Deno.test("BACKSPACE", () => {
  const key = "\x7f";

  is("\x1b[127u", { key, type: "press" });

  is("\x1b[127;5u", { key, type: "press", ctrl: true });
  is("\x1b[127;3u", { key, type: "press", alt: true });
  is("\x1b[127;2u", { key, type: "press", shift: true });
  is("\x1b[127;65u", { key, type: "press", caps_lock: true });

  is("\x1b[127;1:1u", { key, type: "press" });
  is("\x1b[127;1:2u", { key, type: "repeat" });
  is("\x1b[127;1:3u", { key, type: "release" });
});

Deno.test("CAPS_LOCK", () => {
  const key = String.fromCodePoint(57358);

  is("\x1b[57358u", { key, type: "press" });

  is("\x1b[57358;5u", { key, type: "press", ctrl: true });
  is("\x1b[57358;3u", { key, type: "press", alt: true });
  is("\x1b[57358;2u", { key, type: "press", shift: true });
  is("\x1b[57358;65u", { key, type: "press", caps_lock: true });

  is("\x1b[57358;1:1u", { key, type: "press" });
  is("\x1b[57358;1:2u", { key, type: "repeat" });
  is("\x1b[57358;1:3u", { key, type: "release" });
});

Deno.test("SCROLL_LOCK", () => {
  const key = String.fromCodePoint(57359);

  is("\x1b[57359u", { key, type: "press" });

  is("\x1b[57359;5u", { key, type: "press", ctrl: true });
  is("\x1b[57359;3u", { key, type: "press", alt: true });
  is("\x1b[57359;2u", { key, type: "press", shift: true });
  is("\x1b[57359;65u", { key, type: "press", caps_lock: true });

  is("\x1b[57359;1:1u", { key, type: "press" });
  is("\x1b[57359;1:2u", { key, type: "repeat" });
  is("\x1b[57359;1:3u", { key, type: "release" });
});

Deno.test("NUM_LOCK", () => {
  const key = String.fromCodePoint(57360);

  is("\x1b[57360u", { key, type: "press" });

  is("\x1b[57360;5u", { key, type: "press", ctrl: true });
  is("\x1b[57360;3u", { key, type: "press", alt: true });
  is("\x1b[57360;2u", { key, type: "press", shift: true });
  is("\x1b[57360;65u", { key, type: "press", caps_lock: true });

  is("\x1b[57360;1:1u", { key, type: "press" });
  is("\x1b[57360;1:2u", { key, type: "repeat" });
  is("\x1b[57360;1:3u", { key, type: "release" });
});

Deno.test("PRINT_SCREEN", () => {
  const key = String.fromCodePoint(57361);

  is("\x1b[57361u", { key, type: "press" });

  is("\x1b[57361;5u", { key, type: "press", ctrl: true });
  is("\x1b[57361;3u", { key, type: "press", alt: true });
  is("\x1b[57361;2u", { key, type: "press", shift: true });
  is("\x1b[57361;65u", { key, type: "press", caps_lock: true });

  is("\x1b[57361;1:1u", { key, type: "press" });
  is("\x1b[57361;1:2u", { key, type: "repeat" });
  is("\x1b[57361;1:3u", { key, type: "release" });
});
