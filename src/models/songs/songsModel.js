import prisma from "../../config/prisma.js";

export async function getAllSongs() {
  try {
    const songs = await prisma.songs.findMany({});
    return songs;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error " });
  }
}

export async function SongsByArtist(artist) {
  try {
    const songs = await prisma.songs.findMany({
      where: {
        artist,
      },
    });

    return songs;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error " });
  }
}

// export async function artistExist(artist) {
//   try {
//     const artist = await prisma.
//   } catch (error) {

//   }
// }

export async function SongsArtistById(id, artist) {
  try {
    const song = await prisma.songs.findUnique({
      where: {
        song_id: parseInt(id),
        artist,
      },
    });

    return song;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error " });
  }
}
