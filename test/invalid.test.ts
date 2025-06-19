import { assertEquals } from "@std/assert";
import { parse_key } from "../src/mod.ts";

Deno.test("CSI ? flags u", () => {
  const bytes = new TextEncoder().encode("\x1b[?31u");
  const key = parse_key(bytes);

  assertEquals(key, undefined);
});
