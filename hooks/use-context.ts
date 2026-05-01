import { ExecutionTraceEntry, StatCard } from "@/types"
import { useState } from "react"

export default function useContext() {
  const [activity, setActivity] = useState<ExecutionTraceEntry[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [stats, setStats] = useState<StatCard[]>([
    { label: "Chunks Indexed", value: "0" },
    { label: "Duplicates Skipped", value: "0" },
    { label: "Embedding Model", value: "gemini-embedding-2" },
    { label: "Vector Store", value: "pgvector (Postgres)" },
  ])

  const sendContext = async (content: string) => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:3000/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
        }),
      })

      if (!response.ok) {
        throw new Error("Request failed")
      }
      const data = await response.json()
      if (!data) {
        setError("error while fetching data:")
        console.log(data)
        return
      }

      setActivity(data.activeLogs)
      setStats(data.stats)
      console.log("chat data:", data)
      setLoading(false)
    } catch (error) {
      setLoading(true)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    activity,
    stats,
    sendContext,
    error,
    loading,
  }
}
