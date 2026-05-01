export function chunkText(text: string) {
  return text
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean)
}
