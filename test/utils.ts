import { assertEquals } from "@std/assert";

import type { Key } from "../src/key.ts";
import { parse } from "../src/parse.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: string | Key): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}
