import { assertEquals } from "@std/assert";
import { new_request } from "../src/mod.ts";

Deno.test("disambiguate", () => {
  const text = new_request({ disambiguate: true });

  assertEquals(text, "\x1b[=1u");
});

Deno.test("events", () => {
  const text = new_request({ events: true });

  assertEquals(text, "\x1b[=2u");
});

Deno.test("alternates", () => {
  const text = new_request({ alternates: true });

  assertEquals(text, "\x1b[=4u");
});

Deno.test("all_keys", () => {
  const text = new_request({ all_keys: true });

  assertEquals(text, "\x1b[=8u");
});

Deno.test("text", () => {
  const text = new_request({ text: true });

  assertEquals(text, "\x1b[=16u");
});
