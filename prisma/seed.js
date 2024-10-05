import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.users.create({
      data: {
        username: `john${i}`,
        email: `john${i}@example.com`,
        password: await hash("password", 10),
        cover_url: `image-user-${i}.jpg`,
        role: Object.values(Role)[Math.floor(Math.random() * 2)],
      },
    });
    users.push(user);
  }

  const artists = [];
  for (let i = 1; i <= 10; i++) {
    const artist = await prisma.artists.create({
      data: {
        name: `artist ${i}`,
        bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        cover_url: `image-artist-${i}.jpg`,
      },
    });
    artists.push(artist);
  }

  const songs = [];
  for (let i = 1; i <= 10; i++) {
    const song = await prisma.songs.create({
      data: {
        title: `music ${i}`,
        album: `album ${i}`,
        lyrics:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        cover_url: `image-songs-${i}`,
        audio_url: `audio-${i}`,
        artist_id:
          artists[Math.floor(Math.random() * artists.length)].artist_id,
      },
    });
    songs.push(song);
  }

  for (let i = 1; i <= 10; i++) {
    await prisma.likes.create({
      data: {
        user_id: users[Math.floor(Math.random() * users.length)].user_id,
        song_id: songs[Math.floor(Math.random() * songs.length)].song_id,
      },
    });
  }

  const playlists = [];
  for (let i = 1; i <= 10; i++) {
    const playlist = await prisma.playlist.create({
      data: {
        user_id: users[Math.floor(Math.random() * users.length)].user_id,
        name: `the biggest ${i}`,
        cover_url: `image-playlist-${i}`,
      },
    });
    playlists.push(playlist);
  }

  for (let i = 1; i <= 10; i++) {
    await prisma.playlistSong.create({
      data: {
        playlist_id:
          playlists[Math.floor(Math.random() * playlists.length)].playlist_id,
        song_id: songs[Math.floor(Math.random() * songs.length)].song_id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
