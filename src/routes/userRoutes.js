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
import { schemaCreateUser, schemaUserLogin } from "../schemas/userSchema.js";
import { tokenVerify } from "../middleware/authentication.js";
import validateReqBody from "../middleware/validatedBody.js";

const router = express.Router();

router.post("/register", validateReqBody(schemaCreateUser), userRegister);
router.post("/login", validateReqBody(schemaUserLogin), userLogin);

router.use(tokenVerify);

router.get("/user/me", getUser);
router.patch("/user/me", updateMeUser);
router.get("/users/:user_id/playlists", getPlaylistsById);

router.get("/artists", getArtists);

router.get("/songs", getSongs);
router.get("/songs/:artist", getSongsByArtist);
router.get("/songs/:artist/:id", getSongsArtistById);

export default router;
