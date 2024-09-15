/*
  Warnings:

  - You are about to drop the column `cover` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the column `cover` on the `playlist` table. All the data in the column will be lost.
  - You are about to drop the column `cover` on the `songs` table. All the data in the column will be lost.
  - You are about to drop the column `cover` on the `users` table. All the data in the column will be lost.
  - Added the required column `cover_url` to the `artists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover_url` to the `playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audio_url` to the `songs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover_url` to the `songs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover_url` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "artists" DROP COLUMN "cover",
ADD COLUMN     "cover_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "playlist" DROP COLUMN "cover",
ADD COLUMN     "cover_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "songs" DROP COLUMN "cover",
ADD COLUMN     "audio_url" TEXT NOT NULL,
ADD COLUMN     "cover_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cover",
ADD COLUMN     "cover_url" TEXT NOT NULL;
