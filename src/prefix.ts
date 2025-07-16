// deno-lint-ignore-file no-control-regex
export type Prefix =
  | "\x1b["
  | "\x1bO";

const PREFIX_RE = /(?:\x1b\[)|(?:\x1bO)/;

export function parse_prefix(text: string): Prefix | undefined {
  const prefix = text.slice(0, 2);

  if (PREFIX_RE.test(prefix)) {
    return prefix as Prefix;
  }
}
