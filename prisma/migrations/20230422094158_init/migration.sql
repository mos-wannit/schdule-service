-- CreateTable
CREATE TABLE "api_key" (
    "id" SERIAL NOT NULL,
    "apiKey" TEXT NOT NULL,

    CONSTRAINT "api_key_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "api_key_apiKey_key" ON "api_key"("apiKey");
