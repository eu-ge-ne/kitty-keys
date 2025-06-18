const encoder = new TextEncoder();

const CSI = "\x1B\x5B";

export function enable_kitty(flags: number): void {
  write(CSI + `=${flags}u`);
}

export function disable_kitty(): void {
  write(CSI + "=0u");
}

export function query_kitty(): void {
  write(CSI + "?u");
}

function write(text: string): void {
  const buf = encoder.encode(text);
  let x = 0;
  while (x < buf.length) {
    x += Deno.stdout.writeSync(buf.subarray(x));
  }
}
