import express from "express";
import { userRegister, userLogin, getUser } from "../controllers/users.js";
import {
  getSongs,
  getSongsByArtist,
  getSongsArtistById,
} from "../controllers/songs.js";
import { schemaCreateUser, schemaUserLogin } from "../schemas/userSchema.js";
import { tokenVerify } from "../middleware/authentication.js";
import validateReqBody from "../middleware/validatedBody.js";

const router = express.Router();

router.post("/register", validateReqBody(schemaCreateUser), userRegister);
router.post("/login", validateReqBody(schemaUserLogin), userLogin);

router.use(tokenVerify);

router.get("/user", getUser);
router.get("/songs", getSongs);
router.get("/songs/:artist", getSongsByArtist);
router.get("/songs/:artist/:id", getSongsArtistById);

export default router;
