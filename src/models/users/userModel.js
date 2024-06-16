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
    return undefined;
  }
}

export async function emailExist(email) {
  try {
    const validUser = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!validUser) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
