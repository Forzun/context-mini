import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

export async function createEmbedding(text: string) {
  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-2",
      contents: text,
      config: {
        outputDimensionality: 1536,
      },
    })

    if (!response) {
      return
    }
    return response
  } catch (error) {
    console.error(error)
  }
}
