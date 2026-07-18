warn The configuration property `package.json#prisma` is deprecated and will be removed in Prisma 7. Please migrate to a Prisma config file (e.g., `prisma.config.ts`).
For more information, see: https://pris.ly/prisma-config

-- CreateEnum
CREATE TYPE "KbCategory" AS ENUM ('EQUIPMENT_TROUBLESHOOTING', 'METHOD_TROUBLESHOOTING', 'CALIBRATION', 'SAMPLE_PREP', 'QUALITY_CONTROL', 'METHOD_DEVELOPMENT', 'GMP_GLP_COMPLIANCE', 'SAFETY', 'DATA_ANALYSIS', 'GENERAL');

-- CreateTable
CREATE TABLE "KnowledgeEntry" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "KbCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "cause" TEXT,
    "answer" TEXT NOT NULL,
    "source" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KbQuestionLog" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "matchedId" TEXT,
    "matchTitle" TEXT,
    "matchScore" DOUBLE PRECISION,
    "askedByName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KbQuestionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeEntry_slug_key" ON "KnowledgeEntry"("slug");

-- CreateIndex
CREATE INDEX "KnowledgeEntry_category_idx" ON "KnowledgeEntry"("category");

-- CreateIndex
CREATE INDEX "KbQuestionLog_createdAt_idx" ON "KbQuestionLog"("createdAt");

