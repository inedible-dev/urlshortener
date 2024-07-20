-- CreateTable
CREATE TABLE "URLS" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "user_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "URLS_id_key" ON "URLS"("id");

-- CreateIndex
CREATE INDEX "URLS_user_id_idx" ON "URLS"("user_id");
