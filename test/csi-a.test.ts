import { assertEquals } from "@std/assert";
import { type KeyEvent, parse } from "../src/mod.ts";

const encoder = new TextEncoder();

export function is(actual: string, expected: KeyEvent): void {
  assertEquals(parse(encoder.encode(actual)), expected);
}

Deno.test("LEFT-RIGHT", () => {
  is("\x1b[D", { key: "D", type: "press" });
  is("\x1b[1D", { key: "1D", type: "press" });

  is("\x1b[1;5D", { key: "1D", type: "press", ctrl: true });
  is("\x1b[1;3D", { key: "1D", type: "press", alt: true });
  is("\x1b[1;2D", { key: "1D", type: "press", shift: true });
  is("\x1b[1;65D", { key: "1D", type: "press", caps_lock: true });

  is("\x1b[1;1:1D", { key: "1D", type: "press" });
  is("\x1b[1;1:2D", { key: "1D", type: "repeat" });
  is("\x1b[1;1:3D", { key: "1D", type: "release" });
});

Deno.test("RIGHT", () => {
  is("\x1b[C", { key: "C", type: "press" });
  is("\x1b[1C", { key: "1C", type: "press" });

  is("\x1b[1;5C", { key: "1C", type: "press", ctrl: true });
  is("\x1b[1;3C", { key: "1C", type: "press", alt: true });
  is("\x1b[1;2C", { key: "1C", type: "press", shift: true });
  is("\x1b[1;65C", { key: "1C", type: "press", caps_lock: true });

  is("\x1b[1;1:1C", { key: "1C", type: "press" });
  is("\x1b[1;1:2C", { key: "1C", type: "repeat" });
  is("\x1b[1;1:3C", { key: "1C", type: "release" });
});
