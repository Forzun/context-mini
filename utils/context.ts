import { createEmbedding } from "@/llm/embedding"

export async function Context(text: string) {
  try {
    const embedding = await createEmbedding(text)
    console.log(embedding)
    return embedding
  } catch (error) {
    console.log("error", error)
  }
}
