/*
  Warnings:

  - A unique constraint covering the columns `[playlist_id,song_id]` on the table `PlaylistSong` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,song_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlaylistSong_playlist_id_song_id_key" ON "PlaylistSong"("playlist_id", "song_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_song_id_key" ON "likes"("user_id", "song_id");
