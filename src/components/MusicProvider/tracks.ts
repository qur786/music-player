import { MusicPlaceholderImage } from "./music-placeholder";
import type { Track } from "react-native-track-player";
import TrackPlayer from "react-native-track-player";
import type { getAll } from "react-native-get-music-files";

type MusicFile = Exclude<Awaited<ReturnType<typeof getAll>>, string>;

export async function mergeQueueTracks(tracks: Track[]) {
  const currentQueue = await TrackPlayer.getQueue();
  const newQueue = [...tracks, ...currentQueue].sort((a, b) =>
    a.title && b.title
      ? a.title.localeCompare(b.title)
      : a.url.localeCompare(b.url)
  );
  await TrackPlayer.setQueue(newQueue);
} // TODO: fix it

export function convertMusicFileToTrack(musicFiles: MusicFile): Track[] {
  const tracks: Track[] = musicFiles.map<Track>(
    ({ album, artist, cover, duration, genre, title, url }) => ({
      url,
      title,
      album,
      genre,
      duration: duration / 1000,
      artist,
      artwork:
        typeof cover === "string" && cover.length > 0
          ? cover
          : MusicPlaceholderImage,
    })
  );

  return tracks;
}
