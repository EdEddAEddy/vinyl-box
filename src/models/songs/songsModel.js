import prisma from "../../config/prisma.js";

export async function getAllSongs() {
  try {
    const songs = await prisma.songs.findMany({});
    return songs;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error " });
  }
}
