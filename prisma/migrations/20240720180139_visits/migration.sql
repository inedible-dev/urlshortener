-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_URLS" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "visits" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_URLS" ("id", "url", "user_id") SELECT "id", "url", "user_id" FROM "URLS";
DROP TABLE "URLS";
ALTER TABLE "new_URLS" RENAME TO "URLS";
CREATE UNIQUE INDEX "URLS_id_key" ON "URLS"("id");
CREATE INDEX "URLS_user_id_idx" ON "URLS"("user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
