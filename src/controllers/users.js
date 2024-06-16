import pool from "../config/dataBase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function userRegister(req, res) {
  const { username, email, password } = req.body;

  try {
    const passwordEncrypt = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "insert into users ( username, email, password ) values ($1, $2, $3) returning *",
      [username, email, passwordEncrypt]
    );

    console.log(newUser);

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
}
