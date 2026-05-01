import { QueryResult } from "@/types"
import { useState } from "react"

export function useQuery() {
  const [loading, setLoading] = useState<boolean>(false)
  const [queryResult, setQueryResult] = useState<QueryResult[]>([])

  const getContext = async (query: string) => {}

  return
}
