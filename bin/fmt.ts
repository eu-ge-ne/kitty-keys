export function s(x: string | undefined, width = 10): string {
  return (x ?? "").toString().padEnd(width);
}

export function x(x: string | undefined, width = 10): string {
  return Deno.inspect(x ?? "", { strAbbreviateSize: width }).padEnd(width);
}

export function y(x: string | undefined): string {
  return Deno.inspect(x ?? "");
}

export function b(x: boolean | undefined, width = 10): string {
  return (x ? "+" : "").padEnd(width);
}
