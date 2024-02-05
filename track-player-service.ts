import TrackPlayer, { Event, RepeatMode } from "react-native-track-player";
import type { ServiceHandler, Track } from "react-native-track-player";

export async function setupPlayer(): Promise<boolean> {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    isSetup = true;
  }

  return isSetup;
}

export async function addTracks(tracks: Track[]): Promise<void> {
  await TrackPlayer.add(tracks);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export const trackPlayerPlaybackService: ServiceHandler = async () => {
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.pause();
  });
};
