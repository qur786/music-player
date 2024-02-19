import { Capability } from "react-native-track-player";
import type { ServiceHandler, Track } from "react-native-track-player";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Event,
  RepeatMode,
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
      ]; // TODO: other capabilities are not supported via notification
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
        },
        alwaysPauseOnInterruption: false,
        capabilities,
        notificationCapabilities: capabilities,
        compactCapabilities: capabilities,
      });
    } catch (err) {
      console.log(err);
    }
    isSetup = true;
  }

  return isSetup;
}

/**
 * A function to add tracks to the player. Additionaly, it adds repeat mode.
 */
export async function addTracks(tracks: Track[]): Promise<void> {
  await TrackPlayer.add(tracks);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
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
};
