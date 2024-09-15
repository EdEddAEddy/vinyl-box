import prisma from "../src/config/prisma.js";
import bcrypt from "bcrypt";

async function main() {
  await prisma.users.createMany({
    data: [
      {
        username: "John doe",
        email: "john@email.com",
        password: await bcrypt.hash("123456", 10),
        cover_url: "image.jpg",
        role: "user",
      },
      {
        username: "Ed",
        email: "ed@email.com",
        password: await bcrypt.hash("123456", 10),
        cover_url: "image.jpg",
        role: "admin",
      },
    ],
  });

  await prisma.songs.create({
    data: {
      title: "filho do fim do mundo",
      album: "single",
      lyrics: "aaaaa    ",
      cover_url: "single.jpg",
      audio_url: "filho-f-mundo.mp3",
      artist: {
        create: {
          name: "BK",
          bio: "bom de mais",
          cover_url: "bk.jpg",
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
