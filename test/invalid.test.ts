import { assertEquals } from "@std/assert";
import { parse_key } from "../src/mod.ts";

Deno.test("CSI ? flags u", () => {
  const bytes = new TextEncoder().encode("\x1b[?31u");
  const key = parse_key(bytes);

  assertEquals(key, undefined);
});

Deno.test("a", () => {
  const bytes = new TextEncoder().encode("a");
  const key = parse_key(bytes);

  assertEquals(key, undefined);
});

Deno.test("CSI 1 z", () => {
  const bytes = new TextEncoder().encode("\x1b[1z");
  const key = parse_key(bytes);

  assertEquals(key, undefined);
});

Deno.test("CSI 1", () => {
  const bytes = new TextEncoder().encode("\x1b[1");
  const key = parse_key(bytes);

  assertEquals(key, undefined);
});

Deno.test("CSI", () => {
  const bytes = new TextEncoder().encode("\x1b[");
  const key = parse_key(bytes);

  assertEquals(key, undefined);
});
