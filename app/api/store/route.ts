import prisma from "@/lib/prisma"
import { chunkText } from "@/utils/chunk"
import { Context } from "@/utils/context"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const chunks = chunkText(body.content)

    console.log("reach here /api/chat/store", {
      chunks: chunks,
      body: body.content,
    })
    for (const chunk of chunks) {
      const value = await Context(chunk)

      const document = await prisma.documentChunk.create({
        data: {
          content: chunk,
        },
      })

      if (!value?.embeddings || !value.embeddings[0] || !document) {
        throw new Error("No document found")
      }

      const embedding = value.embeddings?.[0]?.values

      if (!embedding?.length) {
        throw new Error("Embedding missing")
      }

      const vectorString = `[${embedding.join(",")}]`

      await prisma.$executeRaw`
      UPDATE "DocumentChunk"
      SET embedding = ${vectorString}::vector
      WHERE id = ${document.id}
      `
    }

    return NextResponse.json({
      message: "Stored successfully",
      chunks: chunks.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    )
  }
}
