import { type Body, parse_body } from "./body.ts";
import { decoder } from "./codec.ts";
import { key_name } from "./name.ts";
import { parse_prefix, type Prefix } from "./prefix.ts";
import { parse_scheme, type Scheme } from "./scheme.ts";

/**
 * Represents key event.
 * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#an-overview}
 */
export interface Key extends Body {
  /**
   * Name of the key.
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#functional-key-definitions}
   */
  name: string;

  /**
   * @ignore
   * @internal
   */
  prefix: Prefix;

  /**
   * @ignore
   * @internal
   */
  scheme: Scheme;
}

/**
 * Parses key event from bytes.
 * @param bytes
 * @returns object of {@link Key} type
 * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#an-overview}
 */
export function parse_key(bytes: Uint8Array): Key | undefined {
  const text = decoder.decode(bytes);

  const prefix = parse_prefix(text);
  if (!prefix) {
    return;
  }

  const scheme = parse_scheme(text);
  if (!scheme) {
    return;
  }

  const body = parse_body(text);
  if (!body) {
    return;
  }

  const key: Key = {
    ...body,
    name: key_name(prefix, body.code, scheme),
    prefix,
    scheme,
  };

  return key;
}
