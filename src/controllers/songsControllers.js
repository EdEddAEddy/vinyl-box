import {
  getAllSongs,
  songById,
  songByTitle,
} from "../models/songs/songsModel.js";
import storage from "../utils/storage.js";
import upload from "../middleware/upload.js";

export async function getSongs(_, res) {
  try {
    const songs = await getAllSongs();
    res.status(200).json(songs);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSongById(req, res) {
  try {
    const { song_id } = req.params;

    const song = await songById(song_id);

    if (!song) {
      return res.status(404).json({ error: "Song not found!" });
    }

    return res.status(200).json(song);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSongbyTitle(req, res) {
  try {
    const { q } = req.query;

    const songs = await songByTitle(q);

    if (!songs) {
      return res.status(404).json({ error: "Song not found!" });
    }

    return res.status(200).json(songs);
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
