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

  const bk = await prisma.artists.create({
    data: {
      name: "BK",
      bio: "Abebe Bikila Costa Santos, conhecido pelo seu nome artístico BK, é um rapper, escritor e compositor brasileiro considerado um dos nomes mais influentes do cenário do rap brasileiro.",
      cover_url: "bk.jpg",
    },
  });

  const bigX = await prisma.artists.create({
    data: {
      name: "BigxThaPlug",
      bio: "Xavier Landum, mais conhecido pelo nome artístico de BigXthaPlug, é um rapper americano. Ele está atualmente assinado com a UnitedMasters e é mais conhecido por suas canções Texas, Mmhmm, Climate, Levels e Whip It.",
      cover_url: "big.jpg",
    },
  });

  await prisma.songs.createMany({
    data: [
      {
        title: "Bom te encontrar",
        album: "Verao bandido",
        lyrics:
          "Hoje foi bom te encontrar, aham Agora 'tá tudo bem Falei que a gente ia voltar a respirar e a vida vem Voltar a se olhar, sem se odiar e querer o bem Estar no mesmo lugar sem mal estar, sumiram as nuvens E o céu abriu novamente Me desculpa qualquer coisa Sei que há tempo já superamos Mas nós falamos tanta coisa Que não devia sair da boca Tipo, hoje parece coisa boba Sei que a gente era criança E brigava por coisa pouca A história podia ser outra",
        cover_url: "verao.jpg",
        audio_url: "verao.mp3",
        artist_id: bk.artist_id,
      },
      {
        title: "Julius",
        album: "Gigantes",
        lyrics: "sss",
        cover_url: "julius.jpg",
        audio_url: "julius.mp3",
        artist_id: bk.artist_id,
      },
    ],
  });

  await prisma.songs.createMany({
    data: [
      {
        title: "Hmmmm",
        album: "single",
        lyrics: "hmmm",
        cover_url: "Hmmmm.jpg",
        audio_url: "Hmmmm.mp3",
        artist_id: bigX.artist_id,
      },
      {
        title: "Texas",
        album: "single",
        lyrics: "sss",
        cover_url: "Texas.jpg",
        audio_url: "Texas.mp3",
        artist_id: bigX.artist_id,
      },
    ],
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
