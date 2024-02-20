import { Capability } from "react-native-track-player";
import { FilePaths } from "./src/utils";
import type { ServiceHandler } from "react-native-track-player";
import { Dirs, FileSystem } from "react-native-file-access";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Event,
} from "react-native-track-player";

/**
 * A function to setup player. This needs to be done once for the app.
 */
export async function setupPlayer(): Promise<boolean> {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    try {
      let capabilities = [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SeekTo,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.JumpForward,
        Capability.JumpBackward,
      ]; // other capabilities are not supported via notification
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        alwaysPauseOnInterruption: false,
        capabilities,
        notificationCapabilities: capabilities,
        compactCapabilities: capabilities,
        progressUpdateEventInterval: 1, // Needs to specify to trigger progress update event in playback service. Ref: https://rntp.dev/docs/api/events#playbackprogressupdated
      });
    } catch (err) {
      console.log(err);
    }
    isSetup = true;
  }

  return isSetup;
}

export const trackPlayerPlaybackService: ServiceHandler = async () => {
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext().catch(console.log);
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious().catch(console.log);
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play().catch(console.log);
  });
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause().catch(console.log);
  });
  TrackPlayer.addEventListener(Event.RemoteJumpForward, () => {
    TrackPlayer.seekBy(10).catch(console.log);
  });
  TrackPlayer.addEventListener(Event.RemoteJumpBackward, () => {
    TrackPlayer.seekBy(-10).catch(console.log);
  });
  TrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
    TrackPlayer.seekTo(event.position);
  });
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async (event) => {
    try {
      const currentTrack = await TrackPlayer.getActiveTrack();
      const currentTime = event.position;
      if (currentTrack) {
        await FileSystem.writeFile(
          Dirs.DocumentDir + FilePaths.currentMusicFilePath,
          JSON.stringify({ currentTrack, currentTime })
        );
      }
    } catch (error) {
      console.log(`Error on saving current track: ${error}`);
    }
  });
};
