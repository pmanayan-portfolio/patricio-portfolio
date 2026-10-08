/** Accept comma-separated or one-per-line technology names, preserving their order. */
export function parseTechnologies(value: string): string[] {
  const seen = new Set<string>();
  return value.split(/[,\r\n]+/).map(item => item.trim()).filter(item => {
    const key = item.toLowerCase();
    if (!item || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
