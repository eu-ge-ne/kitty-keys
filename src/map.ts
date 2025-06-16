import { CharKey, FuncKey, type Key } from "./key.ts";

export const map = new Map<string, Key[]>([
  ["\x0d", [
    new FuncKey("ENTER"),
    new FuncKey("ENTER", { ctrl: true }),
    new FuncKey("ENTER", { shift: true }),
    new FuncKey("ENTER", { ctrl: true, shift: true }),
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
  ]],
  ["\x1b\x1b", [
    new FuncKey("ESC", { alt: true }),
    new FuncKey("ESC", { alt: true, shift: true }),
    new FuncKey("ESC", { ctrl: true, alt: true }),
  ]],
  ["\x7f", [
    new FuncKey("BACKSPACE"),
    new FuncKey("BACKSPACE", { shift: true }),
  ]],
  ["\x08", [
    new FuncKey("BACKSPACE", { ctrl: true }),
    new FuncKey("BACKSPACE", { ctrl: true, shift: true }),
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
  ]],
  ["0", [
    new CharKey("0"),
    new CharKey("0", { ctrl: true }),
  ]],
  ["1", [
    new CharKey("1"),
    new CharKey("1", { ctrl: true }),
  ]],
  ["\x1c", [new CharKey("4", { ctrl: true })]],
  ["\x1d", [new CharKey("5", { ctrl: true })]],
  ["\x1e", [new CharKey("6", { ctrl: true })]],
]);
