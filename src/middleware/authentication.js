import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

export async function tokenVerify(req, res, next) {
  const tokenHeader = req.headers["authorization"];
  const token = tokenHeader && tokenHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized..." });
  }

  try {
    const { userId, role } = jwt.verify(token, SECRET);

    req.user = { userId, role };

    next();
  } catch (error) {
    return res.status(500).json({ message: "Invalid Token" });
  }
}

export async function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
}
