import prisma from "../../config/prisma.js";

export async function getAllSongs() {
  try {
    const songs = await prisma.songs.findMany({});
    1;
    return songs;
  } catch (error) {
    console.error("Error get all songs:", error);
    throw error;
  }
}

export async function songById(songId) {
  try {
    const song = await prisma.songs.findUnique({
      where: {
        song_id: parseInt(songId),
      },
    });

    if (!song) {
      return false;
    }

    return song
  } catch (error) {
    console.error("Error get artist by id:", error);
    throw error;
  }
}
