/*
  Warnings:

  - You are about to drop the column `artist` on the `songs` table. All the data in the column will be lost.
  - Added the required column `cover` to the `playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artist_id` to the `songs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover` to the `songs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "playlist" ADD COLUMN     "cover" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "songs" DROP COLUMN "artist",
ADD COLUMN     "artist_id" INTEGER NOT NULL,
ADD COLUMN     "cover" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cover" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "artists" (
    "artist_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "cover" TEXT NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("artist_id")
);

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("artist_id") ON DELETE RESTRICT ON UPDATE CASCADE;
