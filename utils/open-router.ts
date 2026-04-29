export async function contextRouter(question: string, context: string) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemma-3n-e2b-it:free",
          messages: [
            {
              role: "user",
              content: `
              You are a retrieval assistant.

              Answer only using provided context.
              If answer is not in context say:
              "I don't know based on provided context."

              Context:
              ${context}

              Question:
              ${question}
              `,
            },
          ],
        }),
      }
    )

    if (response) {
      console.log("llm response", response)
      const data = await response.json()
      console.log(data.choices[0].message.content)
      return data.choices[0].message.content
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    return null
  }
}
