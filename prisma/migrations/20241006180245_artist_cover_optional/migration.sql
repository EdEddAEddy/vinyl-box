-- AlterTable
ALTER TABLE "artists" ALTER COLUMN "cover_url" DROP NOT NULL,
ALTER COLUMN "cover_url" SET DEFAULT 'profile-icon.png';
