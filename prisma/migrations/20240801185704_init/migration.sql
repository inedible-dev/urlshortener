-- CreateTable
CREATE TABLE "URLS" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "user_id" TEXT,
    "visits" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "URLS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "URLS_id_key" ON "URLS"("id");

-- CreateIndex
CREATE INDEX "URLS_user_id_idx" ON "URLS"("user_id");
