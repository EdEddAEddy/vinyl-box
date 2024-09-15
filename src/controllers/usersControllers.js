import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  emailExist,
  findUserByEmail,
  findUserById,
} from "../models/users/userModel.js";

import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;

export async function userRegister(req, res) {
  try {
    const { username, email, password } = req.body;

    const isEmailTaken = await emailExist(email);

    if (isEmailTaken) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const passwordEncrypt = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, passwordEncrypt);
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error registering user:", error);

    console.log(error.code);

    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not exists" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(404).json({ error: "User not exists" });
    }
    const id = { userId: user.user_id, role: user.role };
    const token = jwt.sign(id, SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getUser(req, res) {
  try {
    const id = req.user;

    const user = await findUserById(id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
