import prisma from "@/lib/prisma"
import { Context } from "@/utils/context"
import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
  const body = await req.json()
  try {
    const value = await Context(body.content)

    if (!value?.embeddings) {
      throw new Error("No embeddings found")
    }

    const document = await prisma.documentChunk.create({
      data: {
        content: body.content,
      },
    })

    if (!document) {
      throw new Error("No document found")
    }

    await prisma.$executeRaw`
     UPDATE "DocumentChunk"
     SET embedding = ${value.embeddings[0].values}::vector
     WHERE id = ${document.id}
    `

    return NextResponse.json({
      dimensions: value.embeddings[0].values?.length,
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
