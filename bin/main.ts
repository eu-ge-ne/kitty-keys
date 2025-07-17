// deno-lint-ignore-file no-console
import { parse_key, query_flags, set_flags } from "../src/mod.ts";
import { b, s, x, y } from "./fmt.ts";
import { write } from "./write.ts";

Deno.stdin.setRaw(true);

const reader = Deno.stdin.readable.getReader();
const decoder = new TextDecoder();

write(
  set_flags({
    disambiguate: true,
    events: true,
    alternates: true,
    all_keys: true,
    text: true,
  }),
);

write(query_flags);

self.onunload = () => {
  write(set_flags({}));
  console.log("\nExit.");
};

for (let i = 0;; i += 1) {
  if (i % 10 === 0) {
    console.log(
      `\n${s("EVENT")}${s("TEXT")}${s("NAME", 15)}${s("CODE")}${s("SHIFTED")}${
        s("BASE")
      }${s("SHIFT")}${s("ALT")}${s("CTRL")}${s("SUPER")}${s("CAPS_LOCK")}${
        s("NUM_LOCK")
      }RAW\n`,
    );
  }

  const { value: buf } = await reader.read();

  const text = decoder.decode(buf);
  const key = parse_key(buf!);

  const {
    event,
    text: txt,
    name,
    code,
    shifted_code,
    base_layout_code,
    shift,
    alt,
    ctrl,
    super: sup,
    caps_lock,
    num_lock,
  } = key ?? {};

  console.log(
    `${s(event)}${s(txt)}${x(name, 15)}${x(code)}${x(shifted_code)}${
      x(base_layout_code)
    }${b(shift)}${b(alt)}${b(ctrl)}${b(sup)}${b(caps_lock)}${b(num_lock)}${
      y(text)
    }`,
  );

  if (key?.name === "F10") {
    break;
  }
}
