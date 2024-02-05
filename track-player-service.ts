import TrackPlayer, { Event } from "react-native-track-player";
import type { ServiceHandler } from "react-native-track-player";

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
