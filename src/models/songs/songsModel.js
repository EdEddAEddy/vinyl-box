import prisma from "../../config/prisma.js";

export async function getAllSongs() {
  try {
    const songs = await prisma.songs.findMany({});1
    return songs;
  } catch (error) {
    console.error("Error patching artists:", error);
    throw error;  }
}
