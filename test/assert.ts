import { assertEquals } from "@std/assert";

import {
  type Flags,
  type Key,
  parse_flags,
  parse_key,
  pop_flags,
  push_flags,
  set_flags,
} from "../src/mod.ts";

const encoder = new TextEncoder();

export function assert_parse_key(
  actual: string,
  expected: [Key, number, number] | undefined,
): void {
  assertEquals(parse_key(encoder.encode(actual)), expected);
}

export function assert_set_flags(
  flags: Flags,
  mode: "all" | "set" | "reset" | undefined,
  text: string,
): void {
  assertEquals(set_flags(flags, mode), new TextEncoder().encode(text));
}

export function assert_push_flags(
  flags: Flags,
  text: string,
): void {
  assertEquals(push_flags(flags), new TextEncoder().encode(text));
}

export function assert_pop_flags(
  number: number,
  text: string,
): void {
  assertEquals(pop_flags(number), new TextEncoder().encode(text));
}

export function assert_parse_flags(
  actual: string,
  expected: Flags | undefined,
): void {
  assertEquals(parse_flags(encoder.encode(actual)), expected);
}
