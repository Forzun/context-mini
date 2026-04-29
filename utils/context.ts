import { createEmbedding } from "@/lib/llm/embedding"

export async function Context(text: string) {
  try {
    const embedding = await createEmbedding(text)
    console.log("utils Context:", embedding)
    return embedding
  } catch (error) {
    console.log("error", error)
  }
}
