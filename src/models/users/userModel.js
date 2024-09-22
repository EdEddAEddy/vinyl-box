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

    return user;
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw error;
  }
}

export async function findUserById(id) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        user_id: id,
      },
    });

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

export async function getUserPlaylists(user_id) {
  try {
    const playlists = await prisma.playlist.findMany({
      where: {
        user_id: parseInt(user_id),
      },
    });

    return playlists;
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error " });
  }
}
