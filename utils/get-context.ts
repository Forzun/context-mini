import { contextRouter } from "./open-router"

export async function getChunks(question: string, context: string) {
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
    return error
  }
}
