export function write(bytes: Uint8Array): void {
  let x = 0;
  while (x < bytes.length) {
    x += Deno.stdout.writeSync(bytes.subarray(x));
  }
}
