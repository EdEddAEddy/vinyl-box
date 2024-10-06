import prisma from "../../config/prisma.js";

export async function createUser(username, email, passwordEncrypt) {
  try {
    const user = await prisma.users.create({
      data: {
        username,
        email,
        password: passwordEncrypt,
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function emailExist(email) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
}

export async function findUserByEmail(email) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return false;
    }

    return user;
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw error;
  }
}

export async function findUserById(userId) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        user_id: parseInt(userId),
      },
    });

    if (!user) {
      return false;
    }

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error " });
  }
}

export async function updateUser(id, updates) {
  try {
    const userUpdated = await prisma.users.update({
      where: { user_id: id },
      data: updates,
    });

    return userUpdated;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error " });
  }
}

export async function getUserPlaylists(userId) {
  try {
    const playlists = await prisma.playlist.findMany({
      where: {
        user_id: parseInt(userId),
      },
    });

    return playlists;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error " });
  }
}
