import { assertEquals } from "@std/assert";
import { type Key, parse_key } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: Key): void {
  assertEquals(parse_key(encoder.encode(actual)), expected);
}

Deno.test("a", () => {
  const key: Key = { key: "a", event: "press" };

  is("\x1b[97;;97u", { ...key, text: "a" });

  is("\x1b[97;2u", { ...key, shift: true });
  is("\x1b[97;3u", { ...key, alt: true });
  is("\x1b[97;5u", { ...key, ctrl: true });
  is("\x1b[97;9u", { ...key, super: true });
  is("\x1b[97;17u", { ...key, hyper: true });
  is("\x1b[97;33u", { ...key, meta: true });
  is("\x1b[97;65u", { ...key, caps_lock: true });
  is("\x1b[97;129u", { ...key, num_lock: true });

  is("\x1b[97;1:1u", key);
  is("\x1b[97;1:2u", { ...key, event: "repeat" });
  is("\x1b[97;1:3u", { ...key, event: "release" });
});
