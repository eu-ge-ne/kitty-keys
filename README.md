# @eu-ge-ne/kitty-keys

[Kitty keyboard protocol](https://sw.kovidgoyal.net/kitty/keyboard-protocol)
parser library for Node.js, Deno and Bun.

[![JSR](https://jsr.io/badges/@eu-ge-ne/kitty-keys)](https://jsr.io/@eu-ge-ne/kitty-keys)
[![JSR Score](https://jsr.io/badges/@eu-ge-ne/kitty-keys/score)](https://jsr.io/@eu-ge-ne/kitty-keys)
[![codecov](https://codecov.io/gh/eu-ge-ne/kitty-keys/branch/main/graph/badge.svg?token=AH09FY4Y9O)](https://codecov.io/gh/eu-ge-ne/kitty-keys)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=eu-ge-ne_kitty-keys&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=eu-ge-ne_kitty-keys)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=eu-ge-ne_kitty-keys&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=eu-ge-ne_kitty-keys)

- [Installation](#installation)
  - [Deno](#deno)
  - [Node.js](#nodejs)
  - [Bun](#bun)
- [Example](#example)
- [API](#api)
  - [`parse_key()`](#parse_key)
  - [`set_flags()`](#set_flags)
  - [`query_flags`](#query_flags)
  - [`parse_flags()`](#parse_flags)
  - [`push_flags()`](#push_flags)
  - [`pop_flags()`](#pop_flags)
  - [`Key`](#key)
  - [`Modifiers`](#modifiers)
  - [`Flags`](#flags)
- [Links](#links)
- [License](#license)

## Installation

### Deno

```bash
deno add jsr:@eu-ge-ne/kitty-keys
```

### Node.js

```bash
# pnpm
pnpm i jsr:@eu-ge-ne/kitty-keys

# yarn
yarn add jsr:@eu-ge-ne/kitty-keys

# npm
npx jsr add @eu-ge-ne/kitty-keys
```

### Bun

```bash
bunx jsr add @eu-ge-ne/kitty-keys
```

## Example

```ts ignore
import { parse_key, set_flags } from "jsr:@eu-ge-ne/kitty-keys";

Deno.stdin.setRaw(true);

const flags = set_flags({
  disambiguate: true,
  events: true,
  alternates: true,
  all_keys: true,
  text: true,
});

Deno.stdout.writeSync(flags);

self.onunload = () => {
  Deno.stdout.writeSync(set_flags({}));

  console.log("Exit");
};

const reader = Deno.stdin.readable.getReader();

while (true) {
  const { value } = await reader.read();

  const key = parse_key(value!);
  if (!key) {
    continue;
  }

  console.log(key);

  if (key?.key === "c" && key.ctrl) {
    break;
  }
}
```

## API

### `parse_key()`

Parses key event from bytes.

See <https://sw.kovidgoyal.net/kitty/keyboard-protocol/#an-overview>.

Syntax

```ts ignore
function parse_key(bytes: Uint8Array): Key | undefined;
```

### `set_flags()`

Serializes `Set progressive enhancement flags` request to bytes.

See
<https://sw.kovidgoyal.net/kitty/keyboard-protocol/#progressive-enhancement>.

Syntax

```ts ignore
function set_flags(
  flags: Flags,
  mode: "all" | "set" | "reset" = "all",
): Uint8Array;
```

### `query_flags`

Serialized `Query progressive enhancement flags` request.

See
<https://sw.kovidgoyal.net/kitty/keyboard-protocol/#progressive-enhancement>.

Syntax

```ts ignore
const query_flags: Uint8Array;
```

### `parse_flags()`

Parses progressive enhancement flags reply from bytes.

See
<https://sw.kovidgoyal.net/kitty/keyboard-protocol/#progressive-enhancement>.

Syntax

```ts ignore
function parse_flags(bytes: Uint8Array): Flags | undefined;
```

### `push_flags()`

Serializes `Push progressive enhancement flags` request to bytes.

See
<https://sw.kovidgoyal.net/kitty/keyboard-protocol/#progressive-enhancement>.

Syntax

```ts ignore
function push_flags(flags: Flags): Uint8Array;
```

### `pop_flags()`

Serializes `Pop progressive enhancement flags` request to bytes.

See
<https://sw.kovidgoyal.net/kitty/keyboard-protocol/#progressive-enhancement>.

```ts ignore
function pop_flags(number: number): Uint8Array;
```

### `Key`

Represents key event.

See <https://sw.kovidgoyal.net/kitty/keyboard-protocol/#an-overview>.

```ts ignore
interface Key extends Modifiers {
  /**
   * Name of the key
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#functional-key-definitions}
   */
  name: string;

  /**
   * `unicode-key-code` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  code?: number;

  /**
   * `shifted-key-code` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  shifted_code?: number;

  /**
   * `base-layout-key-code` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#key-codes}
   */
  base_layout_code?: number;

  /**
   * Text representation of the `event-type` sub-field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#event-types}
   */
  event?: "press" | "repeat" | "release";

  /**
   * Text representation of the `text-as-codepoints` field
   * @see {@link https://sw.kovidgoyal.net/kitty/keyboard-protocol/#text-as-code-points}
   */
  text?: string;
}
```

### `Modifiers`

Represents modifier keys.

See <https://sw.kovidgoyal.net/kitty/keyboard-protocol/#modifiers>.

```ts ignore
interface Modifiers {
  /**
   * SHIFT
   */
  shift?: boolean;

  /**
   * ALT/OPTION
   */
  alt?: boolean;

  /**
   * CONTROL
   */
  ctrl?: boolean;

  /**
   * SUPER/COMMAND
   */
  super?: boolean;

  /**
   * CAPS LOCK
   */
  caps_lock?: boolean;

  /**
   * NUM LOCK
   */
  num_lock?: boolean;
}
```

### `Flags`

The progressive enhancement flags.

See <https://sw.kovidgoyal.net/kitty/keyboard-protocol/#id5>.

```ts ignore
interface Flags {
  /**
   * 0b1 (1) Disambiguate escape codes.
   */
  disambiguate?: boolean;

  /**
   * 0b10 (2) Report event types.
   */
  events?: boolean;

  /**
   * 0b100 (4) Report alternate keys.
   */
  alternates?: boolean;

  /**
   * 0b1000 (8) Report all keys as escape codes.
   */
  all_keys?: boolean;

  /**
   * 0b10000 (16) Report associated text.
   */
  text?: boolean;
}
```

## Links

- <https://sw.kovidgoyal.net/kitty/keyboard-protocol>
- <https://www.leonerd.org.uk/hacks/fixterms>

## License

[MIT](https://choosealicense.com/licenses/mit)
