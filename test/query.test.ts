import { assertEquals } from "@std/assert";
import { parse_reply } from "../src/mod.ts";

Deno.test("disambiguate", () => {
  const flags = parse_reply(new TextEncoder().encode("\x1b[?1u"));

  assertEquals(flags, { disambiguate: true });
});

Deno.test("events", () => {
  const flags = parse_reply(new TextEncoder().encode("\x1b[?2u"));

  assertEquals(flags, { events: true });
});

Deno.test("alternates", () => {
  const flags = parse_reply(new TextEncoder().encode("\x1b[?4u"));

  assertEquals(flags, { alternates: true });
});

Deno.test("all_keys", () => {
  const flags = parse_reply(new TextEncoder().encode("\x1b[?8u"));

  assertEquals(flags, { all_keys: true });
});

Deno.test("text", () => {
  const flags = parse_reply(new TextEncoder().encode("\x1b[?16u"));

  assertEquals(flags, { text: true });
});
