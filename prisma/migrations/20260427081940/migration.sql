-- AlterTable
ALTER TABLE "DocumentChunk" ALTER COLUMN "metadata" DROP NOT NULL;

CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE "DocumentChunk"
ADD COLUMN embedding vector(3072);
