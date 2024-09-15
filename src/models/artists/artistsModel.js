import prisma from "../../config/prisma.js";

export async function getAllArtists() {
  try {
    const artists = await prisma.artists.findMany({});
    return artists;
  } catch (error) {
    throw error;
  }
}
