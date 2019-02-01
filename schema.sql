CREATE TABLE "note" (
  "uuid" VARCHAR(36) NOT NULL PRIMARY KEY,
  "content" TEXT,
  "modified" DATETIME NOT NULL
);
CREATE INDEX "modified_index" ON note ("modified");