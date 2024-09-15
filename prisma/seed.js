import prisma from "../src/config/prisma.js";
import bcrypt from "bcrypt";

async function main() {
  await prisma.users.createMany({
    data: [
      {
        username: "John doe",
        email: "john@email.com",
        password: await bcrypt.hash("123456", 10),
        cover: "image.jpg",
        role: "user",
      },
      {
        username: "Ed",
        email: "ed@email.com",
        password: await bcrypt.hash("123456", 10),
        cover: "image.jpg",
        role: "admin",
      },
    ],
  });

  await prisma.artists.create({
    data: {
      name: "BK",
      bio: "bom de mais",
      cover: "bk.jpg",
      songs: 1,
    },
  });

  await prisma.songs.create({
    data: {
      title: "filho do fim do mundo",
      album: "single",
      lyrics: "aaaaa    ",
      artist: BK,
      artist_id: 1,
      cover_url: "single.jpg",
      audio_url: "filho-f-mundo.mp3",
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
