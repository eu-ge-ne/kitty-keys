import { is } from "./utils.ts";

Deno.test("1 + 2 + 4 + 8 + 16", () => {
  is("\x1b[120;;120u", { key: "x", event: "press", text: "x" });

  is("\x1b[120;1:2;120u", { key: "x", event: "repeat", text: "x" });

  is("\x1b[120;1:3u", { key: "x", event: "release" });
});
