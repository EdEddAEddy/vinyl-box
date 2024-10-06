import {
  getAllArtists,
  getArtistById,
  getSongsByArtistId,
  postArtist,
  patchArtist,
} from "../models/artists/artistsModel.js";
import { findUserById } from "../models/users/userModel.js";

export async function getArtists(_, res) {
  try {
    const artists = await getAllArtists();
    res.status(200).json(artists);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function artistById(req, res) {
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

export async function artistSongs(req, res) {
  try {
    const { artist_id } = req.params;

    const artist = await getArtistById(artist_id);

    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }
    const songs = await getSongsByArtistId(artist_id);

    if (!songs) {
      return res.status(404).json({ error: "No songs found from this artist" });
    }

    return res.status(200).json(songs);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function artistRegister(req, res) {
  try {
    const { name, bio, cover_url } = req.body;

    const artist = await postArtist(name, bio, cover_url);

    return res.status(200).json(artist);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function updateArtist(req, res) {
  try {
    const { name, bio, cover_url } = req.body;
    const { artist_id } = req.params;

    const artist = await getArtistById(artist_id);

    if (!artist) {
      return res.status(200).json({ error: "Artist not found" });
    }

    const updates = {};

    if (name !== undefined) {
      updates.name = name;
    }
    if (bio !== undefined) {
      updates.bio = bio;
    }
    if (cover_url !== undefined) {
      updates.cover_url = cover_url;
    }

    const artistUpdated = await patchArtist(artist_id, updates);

    return res.status(200).json(artistUpdated);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
}
