import { assertEquals } from "@std/assert";
import { type Key, parse_key } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: Key): void {
  assertEquals(parse_key(encoder.encode(actual)), expected);
}

export function is_text(actual: string, expected: string): void {
  assertEquals(parse_key(encoder.encode(actual)), expected);
}
