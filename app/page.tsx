"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Page() {
  const [input, setInput] = useState<string>("")
  async function handleSubmit() {
    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: input,
        }),
      })
      const data = await response.json()
      console.log("chat data:", data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Ask anything..."
        />
        <Button onClick={handleSubmit}>Send</Button>
      </div>
    </div>
  )
}
