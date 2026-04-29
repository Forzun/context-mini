import { contextRouter } from "./open-router"

export async function getChunks(question: string, context: string) {
  try {
    const response = await contextRouter(question, context)

    if (!response) {
      return null
    }

    return {
      answer: response,
      trace: {
        chunksRetrieved: 3,
        embeddingModel: "gemini-embedding-2",
      },
      sources: {
        context,
      },
    }
  } catch (error) {
    console.error("Error fetching chunks:", error)
    return error
  }
}
