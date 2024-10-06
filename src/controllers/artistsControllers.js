import {
  getAllArtists,
  getArtistById,
} from "../models/artists/artistsModel.js";

export async function getArtists(req, res) {
  try {
    const artists = await getAllArtists();
    res.status(200).json(artists);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function ArtistById(req, res) {
  try {
    const { artist_id } = req.params;

    const artist = await getArtistById(artist_id);

    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    return res.status(200).json(artist);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
}
