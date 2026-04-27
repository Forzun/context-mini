import prisma from "@/lib/prisma"
import { chunkText } from "@/utils/chunk"
import { Context } from "@/utils/context"
import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json()

    const chunks = chunkText(body.content)

    for (const chunk of chunks) {
      const value = await Context(chunk)

      const document = await prisma.documentChunk.create({
        data: {
          content: chunk,
        },
      })

      if (!value?.embeddings || !document) {
        throw new Error("No document found")
      }

      await prisma.$executeRaw`
       UPDATE "DocumentChunk"
       SET embedding = ${value.embeddings[0].values}::vector
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
