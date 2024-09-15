import { getAllArtists } from "../models/artists/artistsModel.js";

export async function getArtists(req, res) {
  try {
    const artists = await getAllArtists();
    res.status(200).json(artists);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
}
