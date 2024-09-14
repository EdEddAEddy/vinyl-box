import { getAllSongs } from "../models/songs/songsModel.js";

export async function getSongs(req, res) {
  try {
    const songs = await getAllSongs();
    res.status(200).json(songs);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
