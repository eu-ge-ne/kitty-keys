import { assertEquals } from "@std/assert";
import { new_push } from "../src/mod.ts";

Deno.test("disambiguate", () => {
  const text = new_push({ disambiguate: true });

  assertEquals(text, "\x1b[>1u");
});

Deno.test("events", () => {
  const text = new_push({ events: true });

  assertEquals(text, "\x1b[>2u");
});

Deno.test("alternates", () => {
  const text = new_push({ alternates: true });

  assertEquals(text, "\x1b[>4u");
});

Deno.test("all_keys", () => {
  const text = new_push({ all_keys: true });

  assertEquals(text, "\x1b[>8u");
});

Deno.test("text", () => {
  const text = new_push({ text: true });

  assertEquals(text, "\x1b[>16u");
});
