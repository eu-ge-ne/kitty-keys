// deno-lint-ignore-file no-console
import { FuncKey, parse } from "../src/mod.ts";

Deno.stdin.setRaw(true);

const reader = Deno.stdin.readable.getReader();
const decoder = new TextDecoder();

while (true) {
  const { value: buf } = await reader.read();
  const text = decoder.decode(buf);
  const key = parse(buf!);

  console.log("\nstdin:", { buf, text, key });

  if (key instanceof FuncKey) {
    if (key.name === "ESC") {
      break;
    }
  }
}
