const esc_codes = new Map<string, string>([
  ["\r", "ENTER"],
  ["\t", "TAB"],
  ["\x7f", "DEL"],
  ["A", "UP"],
  ["2", "INSERT"],
  ["21", "F10"],
]);

export function esc_code_name(esc_code: string): string {
  return esc_codes.get(esc_code) ?? esc_code;
}
