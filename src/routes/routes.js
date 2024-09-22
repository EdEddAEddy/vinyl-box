import express from "express";
import { getArtists } from "../controllers/artistsControllers.js";
import {
  userRegister,
  userLogin,
  getUser,
  updateMeUser,
  getPlaylistsById,
} from "../controllers/usersControllers.js";
import {
  getSongs,
  getSongsByArtist,
  getSongsArtistById,
} from "../controllers/songsControllers.js";
import {
  schemaCreateUser,
  schemaUserLogin,
  schemaUpdateUser,
  schemaUserId,
} from "../schemas/userSchema.js";
import { tokenVerify } from "../middleware/authentication.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post("/register", validate(schemaCreateUser, "body"), userRegister);
router.post("/login", validate(schemaUserLogin, "body"), userLogin);

router.use(tokenVerify);

router.get("/user/me", getUser);
router.patch("/user/me", validate(schemaUpdateUser, "body"), updateMeUser);
router.get(
  "/user/:user_id/playlists",
  validate(schemaUserId, "params"),
  getPlaylistsById
);

router.get("/artists", getArtists);

router.get("/songs", getSongs);
router.get("/songs/:artist", getSongsByArtist);
router.get("/songs/:artist/:id", getSongsArtistById);

export default router;
