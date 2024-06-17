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
