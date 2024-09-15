import {
  getAllSongs,
  SongsByArtist,
  SongsArtistById,
} from "../models/songs/songsModel.js";

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
