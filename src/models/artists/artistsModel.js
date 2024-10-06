import prisma from "../../config/prisma.js";

export async function getAllArtists() {
  try {
    const artists = await prisma.artists.findMany({});
    return artists;
  } catch (error) {
    throw error;
  }
}

export async function getArtistById(artistId) {
  try {
    const artist = await prisma.artists.findUnique({
      where: {
        artist_id: parseInt(artistId),
      },
    });

    if (!artist) {
      return false;
    }

    return artist;
  } catch (error) {
    throw error;
  }
}
