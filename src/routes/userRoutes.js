import express from "express";
import { userRegister, userLogin } from "../controllers/users.js";
import { schemaCreateUser, schemaUserLogin } from "../schemas/userSchema.js";
import validateReqBody from "../middleware/validatedBody.js";

const router = express.Router();

router.post("/register", validateReqBody(schemaCreateUser), userRegister);
router.post("/login", validateReqBody(schemaUserLogin), userLogin);

export default router;
