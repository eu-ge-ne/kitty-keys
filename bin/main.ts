// deno-lint-ignore-file no-console
import { Key, parse } from "../src/mod.ts";

Deno.stdin.setRaw(true);

const reader = Deno.stdin.readable.getReader();
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const CSI = "\x1B\x5B";

function enable_kitty_protocol(): void {
  write(CSI + "=1u");
}

function disable_kitty_protocol(): void {
  write(CSI + "=0u");
}

function query_kitty_protocol(): void {
  write(CSI + "?u");
}

function write(text: string): void {
  const buf = encoder.encode(text);
  let x = 0;
  while (x < buf.length) {
    x += Deno.stdout.writeSync(buf.subarray(x));
  }
}

enable_kitty_protocol();
query_kitty_protocol();

while (true) {
  const { value: buf } = await reader.read();
  const text = decoder.decode(buf);
  const key = parse(buf!);

  console.log("\nstdin:", { buf, text, key });

  if (key instanceof Key && key.name === "ESC") {
    break;
  }
}

disable_kitty_protocol();
