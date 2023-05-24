-- CreateTable
CREATE TABLE "schedule" (
    "id" TEXT NOT NULL,
    "isEnable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_history" (
    "id" TEXT NOT NULL,
    "cronExpression" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_history_pkey" PRIMARY KEY ("id")
);
