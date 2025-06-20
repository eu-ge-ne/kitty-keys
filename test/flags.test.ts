import { assertEquals } from "@std/assert";

import { parse_flags, pop_flags, push_flags, set_flags } from "../src/mod.ts";

Deno.test("set disambiguate", () => {
  const text = set_flags({ disambiguate: true });

  assertEquals(text, "\x1b[=1u");
});

Deno.test("set events", () => {
  const text = set_flags({ events: true });

  assertEquals(text, "\x1b[=2u");
});

Deno.test("set alternates", () => {
  const text = set_flags({ alternates: true });

  assertEquals(text, "\x1b[=4u");
});

Deno.test("set all_keys", () => {
  const text = set_flags({ all_keys: true });

  assertEquals(text, "\x1b[=8u");
});

Deno.test("set text", () => {
  const text = set_flags({ text: true });

  assertEquals(text, "\x1b[=16u");
});

Deno.test("set all", () => {
  const text = set_flags({}, "all");

  assertEquals(text, "\x1b[=0u");
});

Deno.test("set", () => {
  const text = set_flags({}, "set");

  assertEquals(text, "\x1b[=0;2u");
});

Deno.test("reset", () => {
  const text = set_flags({}, "reset");

  assertEquals(text, "\x1b[=0;3u");
});

Deno.test("push disambiguate", () => {
  const text = push_flags({ disambiguate: true });

  assertEquals(text, "\x1b[>1u");
});

Deno.test("push events", () => {
  const text = push_flags({ events: true });

  assertEquals(text, "\x1b[>2u");
});

Deno.test("push alternates", () => {
  const text = push_flags({ alternates: true });

  assertEquals(text, "\x1b[>4u");
});

Deno.test("push all_keys", () => {
  const text = push_flags({ all_keys: true });

  assertEquals(text, "\x1b[>8u");
});

Deno.test("push text", () => {
  const text = push_flags({ text: true });

  assertEquals(text, "\x1b[>16u");
});

Deno.test("pop", () => {
  const text = pop_flags(1);

  assertEquals(text, "\x1b[<1u");
});

Deno.test("parse disambiguate", () => {
  const flags = parse_flags(new TextEncoder().encode("\x1b[?1u"));

  assertEquals(flags, { disambiguate: true });
});

Deno.test("parse events", () => {
  const flags = parse_flags(new TextEncoder().encode("\x1b[?2u"));

  assertEquals(flags, { events: true });
});

Deno.test("parse alternates", () => {
  const flags = parse_flags(new TextEncoder().encode("\x1b[?4u"));

  assertEquals(flags, { alternates: true });
});

Deno.test("parse all_keys", () => {
  const flags = parse_flags(new TextEncoder().encode("\x1b[?8u"));

  assertEquals(flags, { all_keys: true });
});

Deno.test("parse text", () => {
  const flags = parse_flags(new TextEncoder().encode("\x1b[?16u"));

  assertEquals(flags, { text: true });
});

Deno.test("parse invalid flags", () => {
  const flags = parse_flags(new TextEncoder().encode("\x1b[?xu"));

  assertEquals(flags, undefined);
});

Deno.test("parse invalid prefix", () => {
  const flags = parse_flags(new TextEncoder().encode("\x1b[1u"));

  assertEquals(flags, undefined);
});

Deno.test("parse invalid postfix", () => {
  const flags = parse_flags(new TextEncoder().encode("\x1b[?1x"));

  assertEquals(flags, undefined);
});
