export function chunkText(text: string, size = 800, overlap = 150) {
  const chunks = []

  if (text.length < size) {
    return [text]
  }

  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size))
  }

  return chunks
}
