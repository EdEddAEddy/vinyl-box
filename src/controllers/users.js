import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, emailExist } from "../models/users/userModel.js";

export async function userRegister(req, res) {
  try {
    const { username, email, password } = req.body;

    const emailExists = await emailExist(email);

    if (emailExists) {
      return res
        .status(400)
        .json({ message: "Invalid email for registration" });
    }

    const passwordEncrypt = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, passwordEncrypt);

    const { password: _, ...userWithoutPassword } = user;
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ mensagem: "Internal server error." });
  }
}
