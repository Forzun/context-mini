import prisma from "@/lib/prisma"
import { Context } from "@/utils/context"
import { getChunks } from "@/utils/get-context"
import { NextRequest, NextResponse } from "next/server"
import { match } from "node:assert/strict"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    console.log("get query embedding...", body.query)

    const queryEmbedding = await Context(body.query)

    if (!queryEmbedding?.embeddings) {
      console.log("no query embedding found")
      return NextResponse.json(
        {
          message: "no query embedding found",
        },
        {
          status: 400,
        }
      )
    }

    const embedding = queryEmbedding.embeddings[0].values

    if (!embedding?.length) {
      throw new Error("No embedding found")
    }

    const vectorString = `[${embedding.join(",")}]`

    const matches = await prisma.$queryRaw<{ content: string }[]>`
    SELECT content
    FROM "DocumentChunk"
    ORDER BY embedding <=> ${vectorString}::vector
    LIMIT 3
    `

    if (!matches.length) {
      return NextResponse.json(
        {
          message: "no matches found",
        },
        {
          status: 400,
        }
      )
    }

    const context = matches.map((x) => x.content).join("\n")

    const result = await getChunks(body.query, context)

    console.log("reach here /api/chat/chat", {
      context: context,
      body: body.query,
      result: result,
      queryEmbedding: queryEmbedding.embeddings[0].values?.slice(0, 500),
      queryEmbeddingLength: queryEmbedding.embeddings[0].values?.length,
    })

    return NextResponse.json({
      result: result,
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
