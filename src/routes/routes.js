import express from "express";
import {
  getArtists,
  artistById,
  artistSongs,
  artistRegister,
  updateArtist,
} from "../controllers/artistsControllers.js";
import {
  userRegister,
  userLogin,
  getUser,
  updateMeUser,
  getPlaylistsById,
} from "../controllers/usersControllers.js";
import {
  getSongs,
  getSongById,
  getSongbyTitle,
} from "../controllers/songsControllers.js";
import {
  schemaCreateUser,
  schemaUserLogin,
  schemaUpdateUser,
  schemaUserId,
} from "../schemas/userSchema.js";
import { isAdmin, tokenVerify } from "../middleware/authentication.js";
import { normalizeDataMiddleware } from "../middleware/normalizeData.js";
import validate from "../middleware/validate.js";
import { schemaArtistId } from "../schemas/artistSchema.js";
import { schemaSongId } from "../schemas/songSchema.js";

const router = express.Router();

router.post(
  "/register",
  validate(schemaCreateUser, "body"),
  normalizeDataMiddleware,
  userRegister
);
router.post(
  "/login",
  validate(schemaUserLogin, "body"),
  normalizeDataMiddleware,
  userLogin
);

router.use(tokenVerify);

router.get("/user/me", getUser);
router.patch(
  "/user/me",
  validate(schemaUpdateUser, "body"),
  normalizeDataMiddleware,
  updateMeUser
);
router.get(
  "/user/:user_id/playlists",
  validate(schemaUserId, "params"),
  getPlaylistsById
);

router.get("/artists", getArtists);
router.get(
  "/artists/:artist_id",
  validate(schemaArtistId, "params"),
  artistById
);
router.get(
  "/artists/:artist_id/songs",
  validate(schemaArtistId, "params"),
  artistSongs
);
router.post("/artist", isAdmin, normalizeDataMiddleware, artistRegister);
router.patch(
  "/artist/:artist_id",
  normalizeDataMiddleware,
  isAdmin,
  updateArtist
);

router.get("/songs", getSongs);
router.get("/songs/search", getSongbyTitle);
router.get("/songs/:song_id", validate(schemaSongId, "params"), getSongById);
// router.get("/songs/:artist/:id", getSongsArtistById);

export default router;
