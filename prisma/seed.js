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

  const existingLikes = new Set();

  for (let i = 1; i <= 10; i++) {
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      const key = `${randomUser.user_id}-${randomSong.song_id}`;
      if (!existingLikes.has(key)) {
        try {
          await prisma.likes.create({
            data: {
              user_id: randomUser.user_id,
              song_id: randomSong.song_id,
            },
          });
          existingLikes.add(key);
          break;
        } catch (error) {
          if (error.code === "P2002") {
            attempts++;
          } else {
            throw error;
          }
        }
      } else {
        attempts++;
      }
    }

    if (attempts === maxAttempts) {
      console.log(
        `Não foi possível adicionar uma nova música à playlist após ${maxAttempts} tentativas.`
      );
    }
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

  const existingPlaylistSongs = new Set();

  for (let i = 1; i <= 10; i++) {
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const randomPlaylist =
        playlists[Math.floor(Math.random() * playlists.length)];
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      const key = `${randomPlaylist.playlist_id}-${randomSong.song_id}`;

      if (!existingPlaylistSongs.has(key)) {
        try {
          await prisma.playlistSong.create({
            data: {
              playlist_id: randomPlaylist.playlist_id,
              song_id: randomSong.song_id,
            },
          });
          existingPlaylistSongs.add(key);
          break;
        } catch (error) {
          if (error.code === "P2002") {
            attempts++;
          } else {
            throw error;
          }
        }
      } else {
        attempts++;
      }
    }

    if (attempts === maxAttempts) {
      console.log(
        `Não foi possível adicionar uma nova música à playlist após ${maxAttempts} tentativas.`
      );
    }
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
