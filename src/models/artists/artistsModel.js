import prisma from "../../config/prisma.js";

export async function getAllArtists() {
  try {
    const artists = await prisma.artists.findMany({});
    return artists;
  } catch (error) {
    console.error("Error fetching all artists:", error);
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
    console.error("Error fetching artists by id:", error);
    throw error;
  }
}

export async function getSongsByArtistId(artistId) {
  try {
    const songs = await prisma.songs.findMany({
      where: {
        artist_id: parseInt(artistId),
      },
    });

    if (songs.length === 0) {
      return false;
    }

    return songs;
  } catch (error) {
    console.error("Error fetching songs by artist id:", error);
    throw error;
  }
}

export async function postArtist(name, bio, cover_url) {
  try {
    const artist = await prisma.artists.create({
      data: {
        name,
        bio,
        cover_url,
      },
    });

    return artist;
  } catch (error) {
    console.error("Error creating artists:", error);
    throw error;
  }
}

export async function patchArtist(artistId, updates) {
  try {
    const artistUpdated = await prisma.artists.update({
      where: { artist_id: parseInt(artistId) },
      data: updates,
    });
    return artistUpdated;
  } catch (error) {
    console.error("Error patching artists:", error);
    throw error;
  }
}
