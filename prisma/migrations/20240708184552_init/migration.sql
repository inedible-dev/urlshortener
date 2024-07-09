-- CreateTable
CREATE TABLE "URLS" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "URLS_id_key" ON "URLS"("id");
