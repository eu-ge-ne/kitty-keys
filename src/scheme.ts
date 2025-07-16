export type Scheme =
  | "u"
  | "~"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "H"
  | "P"
  | "Q"
  | "S";

const SCHEME_RE = /[u~ABCDEFHPQS]/;

export function parse_scheme(text: string): Scheme | undefined {
  const scheme = text.at(-1) ?? "";

  if (SCHEME_RE.test(scheme)) {
    return scheme as Scheme;
  }
}
