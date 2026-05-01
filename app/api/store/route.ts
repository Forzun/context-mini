import prisma from "@/lib/prisma"
import { chunkText } from "@/utils/chunk"
import { Context } from "@/utils/context"
import { hashText } from "@/utils/hash"
import { NextResponse } from "next/server"
import { activeLogs, getStats } from "@/data"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    let skipped = 0
    const chunks = chunkText(body.content)

    console.log("reach here /api/chat/store", {
      chunks: chunks,
      body: body.content,
    })

    activeLogs.push(
      {
        timestamp: new Date().toTimeString().split(" ")[0],
        message: `Query received: ${body.context}`,
        type: "info",
      },
      {
        timestamp: new Date().toTimeString().split(" ")[0],
        message: `Found ${chunks.length} chunks`,
        type: "success",
      }
    )

    for (const chunk of chunks) {
      const hash = hashText(chunk)

      const hashExist = await prisma.documentChunk.findUnique({
        where: {
          contentHash: hash,
        },
      })

      if (hashExist) {
        console.log("Document already exists")
        skipped++
        activeLogs.push({
          timestamp: new Date().toTimeString().split(" ")[0],
          message: `Duplicate detected in ${chunk.length}, ${skipped}`,
          type: "info",
        })
        continue
      }

      const value = await Context(chunk)

      if (!value?.embeddings || !value.embeddings[0]) {
        throw new Error("No document found")
      }

      const embedding = value.embeddings?.[0]?.values

      if (!embedding?.length) {
        throw new Error("Embedding missing")
      }

      const document = await prisma.documentChunk.create({
        data: {
          content: chunk,
          contentHash: hash,
        },
      })
      const vectorString = `[${embedding.join(",")}]`

      await prisma.$executeRaw`
      UPDATE "DocumentChunk"
      SET embedding = ${vectorString}::vector
      WHERE id = ${document.id}
      `
    }

    const chunkIndex = await prisma.documentChunk.count()
    activeLogs.push(
      {
        timestamp: new Date().toTimeString().split(" ")[0],
        message: "Vector store sync completed",
        type: "success",
      },
      {
        timestamp: new Date().toTimeString().split(" ")[0],
        message: "Query received from user",
        type: "info",
      }
    )
    const stats = getStats(
      chunkIndex,
      skipped,
      process.env.EMBEDDING_MODE as string
    )

    return NextResponse.json({
      message: "Stored successfully",
      chunks: chunks.length,
      skipped: skipped,
      activeLogs: activeLogs,
      stats: stats,
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
