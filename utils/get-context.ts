import { contextRouter } from "./open-router"

interface GetChunksResult {
  answer: string
  sources: {
    context: string
  }
}

export async function getChunks(
  question: string,
  context: string
): Promise<GetChunksResult | null> {
  try {
    const response = await contextRouter(question, context)

    if (!response) {
      return null
    }

    return {
      answer: response,
      sources: {
        context,
      },
    }
  } catch (error) {
    console.error("Error fetching chunks:", error)
    return null
  }
}
