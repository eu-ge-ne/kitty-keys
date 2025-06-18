// deno-lint-ignore-file no-console
import { parse_key } from "../src/mod.ts";
import { b, s, x, y } from "./fmt.ts";
import { disable_kitty, enable_kitty, query_kitty } from "./kitty.ts";

Deno.stdin.setRaw(true);

const reader = Deno.stdin.readable.getReader();
const decoder = new TextDecoder();

enable_kitty(1 + 2 + 4 + 8 + 16);
query_kitty();

self.onunload = () => {
  disable_kitty();
  console.log("\nExit.");
};

for (let i = 0;; i += 1) {
  if (i % 10 === 0) {
    console.log(
      `\n${s("EVENT")}${s("TEXT")}${s("NAME", 15)}${s("KEY")}${s("SHIFT_KEY")}${
        s("BASE_KEY")
      }${s("SHIFT")}${s("ALT")}${s("CTRL")}${s("SUPER")}${s("CAPS_LOCK")}${
        s("NUM_LOCK")
      }BYTES\n`,
    );
  }

  const { value: buf } = await reader.read();

  const text = decoder.decode(buf);
  const key = parse_key(buf!);

  if (typeof key !== "string") {
    const {
      event,
      text: txt,
      name,
      key: k,
      shift_key,
      base_key,
      shift,
      alt,
      ctrl,
      super: sup,
      caps_lock,
      num_lock,
    } = key;

    console.log(
      `${s(event)}${s(txt)}${s(name, 15)}${x(k)}${x(shift_key)}${x(base_key)}${
        b(shift)
      }${b(alt)}${b(ctrl)}${b(sup)}${b(caps_lock)}${b(num_lock)}${y(text)}`,
    );
  }

  if (typeof key === "object" && key.key === "c" && key.ctrl) {
    break;
  }
}
