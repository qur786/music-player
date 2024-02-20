import { MusicPlaceholderImage } from "./music-placeholder";
import type { Track } from "react-native-track-player";
import TrackPlayer from "react-native-track-player";
import type { getAll } from "react-native-get-music-files";

type MusicFile = Exclude<Awaited<ReturnType<typeof getAll>>, string>;

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

/**
 * This is a combination of removePreviousTracks() and removeUpcomingTracks().
 * To set the player's queue without playback interruption, remove
 * all tracks with remove() that are not the activeTrackIndex. The current
 * track will be automatically shifted to the first element. Then, splice tracks that
 * the currentTrack is at the first element, and add the spliced tracks.
 * Ref: https://github.com/doublesymmetry/react-native-track-player/issues/1711#issuecomment-1529325813
 */
export async function setQueueUninterrupted(tracks: Track[]): Promise<void> {
  const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
  if (currentTrackIndex === undefined) {
    return await TrackPlayer.setQueue(tracks); // if no currentTrack, its a simple setQueue
  }

  const currentQueue = await TrackPlayer.getQueue();
  const currentTrack = currentQueue[currentTrackIndex];
  const currentTrackNewIndex = tracks.findIndex(
    (track) => track.url === currentTrack.url
  );
  if (currentTrackNewIndex < 0) {
    return await TrackPlayer.setQueue(tracks);
  } // if currentTrack is not in tracks, its a simple setQueue

  let removeTrackIndices = [...Array(currentQueue.length).keys()];
  removeTrackIndices.splice(currentTrackIndex, 1);
  await TrackPlayer.remove(removeTrackIndices); // Remove all the tracks except the current one

  const firstTracks = tracks.slice(0, currentTrackNewIndex); // First half of the track
  const secondTracks = tracks.slice(currentTrackNewIndex + 1); // Second half of the tracks
  await TrackPlayer.add(firstTracks, 0); // To add first half of the tracks before the current i.e. 0th index track
  await TrackPlayer.add(secondTracks); // To add second half of the tracks in the last of the queue
}
