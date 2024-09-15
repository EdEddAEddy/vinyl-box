import {
  getAllSongs,
  SongsByArtist,
  SongsArtistById,
} from "../models/songs/songsModel.js";
import storage from "../utils/storage.js";
import upload from "../middleware/upload.js";

export async function getSongs(req, res) {
  try {
    const songs = await getAllSongs();
    res.status(200).json(songs);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSongsByArtist(req, res) {
  try {
    const { artist } = req.params;

    // const isArtistExisting = await artistExist(artist);

    const songs = await SongsByArtist(artist);
    return res.status(200).json(songs);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSongsArtistById(req, res) {
  try {
    const { id, artist } = req.params;

    const song = await SongsArtistById(id, artist);
    return res.status(200).json(song);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const uploadSong = [
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, album, lyrics, artist_id } = req.body;
      const audioFile = req.files["audio"][0];
      const coverFile = req.files["cover"][0];

      const audioUrl = await storage.save(audioFile, "audio");
      const coverUrl = await storage.save(coverFile, "images");

      const song = await addSong(
        title,
        album,
        lyrics,
        artist_id,
        audioUrl,
        coverUrl
      );

      res.status(200).json(song);
    } catch (error) {
      console.error("Error uploading song:", error);
      res.status(500).json({ error: "Error uploading song" });
    }
  },
];
