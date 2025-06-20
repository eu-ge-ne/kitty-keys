export const func_keys = new Map<string, string>([
  ["\x1b", "ESC"],
  ["\r", "ENTER"],
  ["\t", "TAB"],
  ["\x7f", "BACKSPACE"],

  ["2~", "INSERT"],
  ["3~", "DELETE"],
  ["5~", "PAGE_UP"],
  ["6~", "PAGE_DOWN"],
  ["7~", "HOME"],
  ["8~", "END"],
  ["11~", "F1"],
  ["12~", "F2"],
  ["13~", "F3"],
  ["14~", "F4"],
  ["15~", "F5"],
  ["17~", "F6"],
  ["18~", "F7"],
  ["19~", "F8"],
  ["20~", "F9"],
  ["21~", "F10"],
  ["23~", "F11"],
  ["24~", "F12"],

  ["A", "UP"],
  ["B", "DOWN"],
  ["C", "RIGHT"],
  ["D", "LEFT"],
  ["F", "END"],
  ["H", "HOME"],
  ["P", "F1"],
  ["Q", "F2"],
  ["S", "F4"],

  ["1A", "UP"],
  ["1B", "DOWN"],
  ["1C", "RIGHT"],
  ["1D", "LEFT"],
  ["1F", "END"],
  ["1H", "HOME"],
  ["1P", "F1"],
  ["1Q", "F2"],
  ["1S", "F4"],

  [String.fromCodePoint(57358), "CAPS_LOCK"],
  [String.fromCodePoint(57359), "SCROLL_LOCK"],
  [String.fromCodePoint(57360), "NUM_LOCK"],
  [String.fromCodePoint(57361), "PRINT_SCREEN"],
  [String.fromCodePoint(57362), "PAUSE"],
  [String.fromCodePoint(57363), "MENU"],
  [String.fromCodePoint(57441), "LEFT_SHIFT"],
  [String.fromCodePoint(57442), "LEFT_CONTROL"],
  [String.fromCodePoint(57443), "LEFT_ALT"],
  [String.fromCodePoint(57444), "LEFT_SUPER"],
  [String.fromCodePoint(57445), "LEFT_HYPER"],
  [String.fromCodePoint(57446), "LEFT_META"],
  [String.fromCodePoint(57447), "RIGHT_SHIFT"],
  [String.fromCodePoint(57448), "RIGHT_CONTROL"],
  [String.fromCodePoint(57449), "RIGHT_ALT"],
  [String.fromCodePoint(57450), "RIGHT_SUPER"],
  [String.fromCodePoint(57451), "RIGHT_HYPER"],
  [String.fromCodePoint(57452), "RIGHT_META"],
  [String.fromCodePoint(57453), "ISO_LEVEL3_SHIFT"],
  [String.fromCodePoint(57454), "ISO_LEVEL5_SHIFT"],
]);
