import express from "express";
import { userRegister } from "../controllers/users.js";
import { schemaCreateUser } from "../schemas/userSchema.js";
import validateReqBody from "../middleware/validatedBody.js";

const router = express.Router();

router.post("/register", validateReqBody(schemaCreateUser), userRegister);

export default router;
