-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "productionTime" TIMESTAMP(3),
    "factorableType" TEXT NOT NULL,
    "externalId" INTEGER,
    "internalId" INTEGER,
    "requiresId" INTEGER NOT NULL,
    "classification" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "population" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Internal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "command" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "contact" TEXT,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "Internal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "External" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "External_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_externalId_fkey" FOREIGN KEY ("externalId") REFERENCES "External"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_internalId_fkey" FOREIGN KEY ("internalId") REFERENCES "Internal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_requiresId_fkey" FOREIGN KEY ("requiresId") REFERENCES "Internal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
