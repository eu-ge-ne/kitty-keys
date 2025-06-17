import { assertEquals } from "@std/assert";
import { type Key, parse_key } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: Key): void {
  assertEquals(parse_key(encoder.encode(actual)), expected);
}

Deno.test("ESC", () => {
  const key: Key = { key: "\x1b", event: "press", name: "ESC" };

  is("\x1b[27u", key);

  is("\x1b[27;5u", { ...key, ctrl: true });
  is("\x1b[27;3u", { ...key, alt: true });
  is("\x1b[27;2u", { ...key, shift: true });
  is("\x1b[27;65u", { ...key, caps_lock: true });

  is("\x1b[27;1:1u", key);
  is("\x1b[27;1:2u", { ...key, event: "repeat" });
  is("\x1b[27;1:3u", { ...key, event: "release" });
});

Deno.test("ENTER", () => {
  const key: Key = { key: "\r", event: "press", name: "ENTER" };

  is("\x1b[13u", key);

  is("\x1b[13;5u", { ...key, ctrl: true });
  is("\x1b[13;3u", { ...key, alt: true });
  is("\x1b[13;2u", { ...key, shift: true });
  is("\x1b[13;65u", { ...key, caps_lock: true });

  is("\x1b[13;1:1u", key);
  is("\x1b[13;1:2u", { ...key, event: "repeat" });
  is("\x1b[13;1:3u", { ...key, event: "release" });
});

Deno.test("TAB", () => {
  const key: Key = { key: "\t", event: "press", name: "TAB" };

  is("\x1b[9u", key);

  is("\x1b[9;5u", { ...key, ctrl: true });
  is("\x1b[9;3u", { ...key, alt: true });
  is("\x1b[9;2u", { ...key, shift: true });
  is("\x1b[9;65u", { ...key, caps_lock: true });

  is("\x1b[9;1:1u", key);
  is("\x1b[9;1:2u", { ...key, event: "repeat" });
  is("\x1b[9;1:3u", { ...key, event: "release" });
});

Deno.test("BACKSPACE", () => {
  const key = "\x7f";

  is("\x1b[127u", { key, event: "press" });

  is("\x1b[127;5u", { key, event: "press", ctrl: true });
  is("\x1b[127;3u", { key, event: "press", alt: true });
  is("\x1b[127;2u", { key, event: "press", shift: true });
  is("\x1b[127;65u", { key, event: "press", caps_lock: true });

  is("\x1b[127;1:1u", { key, event: "press" });
  is("\x1b[127;1:2u", { key, event: "repeat" });
  is("\x1b[127;1:3u", { key, event: "release" });
});

Deno.test("CAPS_LOCK", () => {
  const key = String.fromCodePoint(57358);

  is("\x1b[57358u", { key, event: "press" });

  is("\x1b[57358;5u", { key, event: "press", ctrl: true });
  is("\x1b[57358;3u", { key, event: "press", alt: true });
  is("\x1b[57358;2u", { key, event: "press", shift: true });
  is("\x1b[57358;65u", { key, event: "press", caps_lock: true });

  is("\x1b[57358;1:1u", { key, event: "press" });
  is("\x1b[57358;1:2u", { key, event: "repeat" });
  is("\x1b[57358;1:3u", { key, event: "release" });
});

Deno.test("SCROLL_LOCK", () => {
  const key = String.fromCodePoint(57359);

  is("\x1b[57359u", { key, event: "press" });

  is("\x1b[57359;5u", { key, event: "press", ctrl: true });
  is("\x1b[57359;3u", { key, event: "press", alt: true });
  is("\x1b[57359;2u", { key, event: "press", shift: true });
  is("\x1b[57359;65u", { key, event: "press", caps_lock: true });

  is("\x1b[57359;1:1u", { key, event: "press" });
  is("\x1b[57359;1:2u", { key, event: "repeat" });
  is("\x1b[57359;1:3u", { key, event: "release" });
});

Deno.test("NUM_LOCK", () => {
  const key = String.fromCodePoint(57360);

  is("\x1b[57360u", { key, event: "press" });

  is("\x1b[57360;5u", { key, event: "press", ctrl: true });
  is("\x1b[57360;3u", { key, event: "press", alt: true });
  is("\x1b[57360;2u", { key, event: "press", shift: true });
  is("\x1b[57360;65u", { key, event: "press", caps_lock: true });

  is("\x1b[57360;1:1u", { key, event: "press" });
  is("\x1b[57360;1:2u", { key, event: "repeat" });
  is("\x1b[57360;1:3u", { key, event: "release" });
});

Deno.test("PRINT_SCREEN", () => {
  const key = String.fromCodePoint(57361);

  is("\x1b[57361u", { key, event: "press" });

  is("\x1b[57361;5u", { key, event: "press", ctrl: true });
  is("\x1b[57361;3u", { key, event: "press", alt: true });
  is("\x1b[57361;2u", { key, event: "press", shift: true });
  is("\x1b[57361;65u", { key, event: "press", caps_lock: true });

  is("\x1b[57361;1:1u", { key, event: "press" });
  is("\x1b[57361;1:2u", { key, event: "repeat" });
  is("\x1b[57361;1:3u", { key, event: "release" });
});

Deno.test("PAUSE", () => {
  const key = String.fromCodePoint(57362);

  is("\x1b[57362u", { key, event: "press" });

  is("\x1b[57362;5u", { key, event: "press", ctrl: true });
  is("\x1b[57362;3u", { key, event: "press", alt: true });
  is("\x1b[57362;2u", { key, event: "press", shift: true });
  is("\x1b[57362;65u", { key, event: "press", caps_lock: true });

  is("\x1b[57362;1:1u", { key, event: "press" });
  is("\x1b[57362;1:2u", { key, event: "repeat" });
  is("\x1b[57362;1:3u", { key, event: "release" });
});
