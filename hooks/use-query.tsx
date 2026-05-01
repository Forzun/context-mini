import { QueryResult } from "@/types"
import { useState } from "react"

export function useQuery() {
  const [loading, setLoading] = useState<boolean>(false)
  const [queryResult, setQueryResult] = useState<QueryResult | undefined>()

  const getContext = async (query: string) => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
        }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      setQueryResult({
        query: data.query,
        answer: data.answer,
        chunks: data.chunks,
        confidence: data.confidence,
        topMatch: data.topMatch,
        grounded: data.grounded,
        trace: data.trace,
      })
      console.log("chat data:", queryResult, data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getContext,
    loading,
    queryResult,
  }
}
