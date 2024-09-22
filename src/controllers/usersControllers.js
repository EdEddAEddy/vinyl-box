import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  emailExist,
  findUserByEmail,
  findUserById,
  updateUser,
  getUserPlaylists,
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

export async function updateMeUser(req, res) {
  try {
    const { userId } = req.user;
    const { username, email, password } = req.body;

    const updates = {};

    if (username !== undefined) {
      updates.username = username;
    }
    if (email !== undefined) {
      updates.email = email;
    }
    if (password !== undefined) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const userUpdated = await updateUser(userId, updates);

    const { password: _, role, ...safeUserData } = userUpdated;

    return res.status(200).json(safeUserData);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getPlaylistsById(req, res) {
  try {
    const { user_id } = req.params;

    const playlists = await getUserPlaylists(user_id);

    if (Object.keys(playlists).length === 0) {
      return res.status(404).json({ message: "User Does Not Have playlist" });
    }

    return res.status(200).json(playlists);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
