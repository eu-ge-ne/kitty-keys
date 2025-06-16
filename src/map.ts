import { CharKey } from "./char.ts";
import { FuncKey } from "./func.ts";
import type { Key } from "./key.ts";

export const map = new Map<string, Key[]>([
  ["\x0d", [
    new FuncKey("ENTER"),
    new FuncKey("ENTER", { ctrl: true }),
    new FuncKey("ENTER", { shift: true }),
    new FuncKey("ENTER", { ctrl: true, shift: true }),
    new CharKey("m", { ctrl: true }),
  ]],
  ["\x1b\x0d", [
    new FuncKey("ENTER", { alt: true }),
    new FuncKey("ENTER", { alt: true, shift: true }),
    new FuncKey("ENTER", { ctrl: true, alt: true }),
  ]],
  ["\x1b", [
    new FuncKey("ESC"),
    new FuncKey("ESC", { ctrl: true }),
    new FuncKey("ESC", { shift: true }),
    new FuncKey("ESC", { ctrl: true, shift: true }),
    new FuncKey("3", { ctrl: true }),
    new FuncKey("[", { ctrl: true }),
  ]],
  ["\x1b\x1b", [
    new FuncKey("ESC", { alt: true }),
    new FuncKey("ESC", { alt: true, shift: true }),
    new FuncKey("ESC", { ctrl: true, alt: true }),
  ]],
  ["\x7f", [
    new FuncKey("BACKSPACE"),
    new FuncKey("BACKSPACE", { shift: true }),
    new CharKey("8", { ctrl: true }),
    new CharKey("?", { ctrl: true }),
  ]],
  ["\x08", [
    new FuncKey("BACKSPACE", { ctrl: true }),
    new FuncKey("BACKSPACE", { ctrl: true, shift: true }),
    new CharKey("h", { ctrl: true }),
  ]],
  ["\x1b\x7f", [
    new FuncKey("BACKSPACE", { alt: true }),
    new FuncKey("BACKSPACE", { alt: true, shift: true }),
  ]],
  ["\x1b\x08", [
    new FuncKey("BACKSPACE", { ctrl: true, alt: true }),
  ]],
  ["\x09", [
    new FuncKey("TAB"),
    new FuncKey("TAB", { ctrl: true }),
    new CharKey("i", { ctrl: true }),
  ]],
  ["\x1b\x09", [
    new FuncKey("TAB", { alt: true }),
    new FuncKey("TAB", { ctrl: true, alt: true }),
  ]],
  ["\x1b[Z", [
    new FuncKey("TAB", { shift: true }),
    new FuncKey("TAB", { ctrl: true, shift: true }),
  ]],
  ["\x1b\x1b[Z", [
    new FuncKey("TAB", { alt: true, shift: true }),
  ]],
  ["\x20", [
    new CharKey(" "),
    new CharKey(" ", { shift: true }),
  ]],
  ["\x00", [
    new CharKey(" ", { ctrl: true }),
    new CharKey(" ", { ctrl: true, shift: true }),
    new CharKey("2", { ctrl: true }),
    new CharKey("@", { ctrl: true }),
  ]],
  ["\x1b\x20", [
    new CharKey(" ", { alt: true }),
    new CharKey(" ", { alt: true, shift: true }),
  ]],
  ["\x1b\x00", [
    new CharKey(" ", { ctrl: true, alt: true }),
  ]],
  ["\x1f", [
    new CharKey("/", { ctrl: true }),
    new CharKey("7", { ctrl: true }),
    new CharKey("_", { ctrl: true }),
  ]],
  ["0", [
    new CharKey("0"),
    new CharKey("0", { ctrl: true }),
  ]],
  ["1", [
    new CharKey("1"),
    new CharKey("1", { ctrl: true }),
  ]],
  ["\x1c", [
    new CharKey("4", { ctrl: true }),
    new CharKey("\\", { ctrl: true }),
  ]],
  ["\x1d", [
    new CharKey("5", { ctrl: true }),
    new CharKey("]", { ctrl: true }),
  ]],
  ["\x1e", [
    new CharKey("6", { ctrl: true }),
    new CharKey("^", { ctrl: true }),
    new CharKey("~", { ctrl: true }),
  ]],
  ["9", [new CharKey("9", { ctrl: true })]],
  ["\x01", [new CharKey("a", { ctrl: true })]],
  ["\x02", [new CharKey("b", { ctrl: true })]],
  ["\x03", [new CharKey("c", { ctrl: true })]],
  ["\x04", [new CharKey("d", { ctrl: true })]],
  ["\x05", [new CharKey("e", { ctrl: true })]],
  ["\x06", [new CharKey("f", { ctrl: true })]],
  ["\x07", [new CharKey("g", { ctrl: true })]],
  ["\n", [new CharKey("j", { ctrl: true })]],
  ["\v", [new CharKey("k", { ctrl: true })]],
  ["\f", [new CharKey("l", { ctrl: true })]],
  ["\x0e", [new CharKey("n", { ctrl: true })]],
  ["\x0f", [new CharKey("o", { ctrl: true })]],
  ["\x10", [new CharKey("p", { ctrl: true })]],
  ["\x11", [new CharKey("q", { ctrl: true })]],
  ["\x12", [new CharKey("r", { ctrl: true })]],
  ["\x13", [new CharKey("s", { ctrl: true })]],
  ["\x14", [new CharKey("t", { ctrl: true })]],
  ["\x15", [new CharKey("u", { ctrl: true })]],
  ["\x16", [new CharKey("v", { ctrl: true })]],
  ["\x17", [new CharKey("w", { ctrl: true })]],
  ["\x18", [new CharKey("x", { ctrl: true })]],
  ["\x19", [new CharKey("y", { ctrl: true })]],
  ["\x1a", [new CharKey("z", { ctrl: true })]],
]);
