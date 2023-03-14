-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('PERSON', 'ENTITY');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'PERSON';

-- CreateTable
CREATE TABLE "sign_newsletter" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "signed_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "sign_newsletter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sign_newsletter" ADD CONSTRAINT "sign_newsletter_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
