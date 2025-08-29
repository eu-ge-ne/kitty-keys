// deno-lint-ignore-file no-console
import { parse_key, query_flags, set_flags } from "../src/mod.ts";

Deno.stdin.setRaw(true);

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

const buf = new Uint8Array(1024);

let j = 0;

while (true) {
  const bytes_read = await Deno.stdin.read(buf);
  if (bytes_read === null) {
    continue;
  }
  const bytes = buf.subarray(0, bytes_read);

  for (let i = 0; i < bytes.length;) {
    const [key, n] = parse_key(bytes.subarray(i));

    if (typeof key === "string") {
      console.table({ j, string: key });
      j += 1;
      i += n;
      continue;
    }

    if (typeof key !== "undefined") {
      const raw = new TextDecoder().decode(bytes.subarray(0, n));
      console.table({ j, ...key, raw });

      if (key.name === "c" && key.ctrl) {
        Deno.exit();
      }

      j += 1;
      i += n;
      continue;
    }

    let next_esc_i = bytes.indexOf(0x1b, i + 1);
    if (next_esc_i < 0) {
      next_esc_i = bytes.length;
    }

    console.table({ j, bytes: bytes.subarray(i, next_esc_i) });
    j += 1;
    i = next_esc_i;
  }
}

function write(bytes: Uint8Array): void {
  let x = 0;
  while (x < bytes.length) {
    x += Deno.stdout.writeSync(bytes.subarray(x));
  }
}
