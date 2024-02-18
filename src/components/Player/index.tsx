import { Controllers } from "../Controllers";
import { SongInfo } from "../SongInfo";
import { SongSlider } from "../SongSlider";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import TrackPlayer, {
  Event,
  type Track,
  useTrackPlayerEvents,
} from "react-native-track-player";

export function Player(): JSX.Element {
  const [currentTrack, setCurrentTrack] = useState<Track>();

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    switch (event.type) {
      case Event.PlaybackActiveTrackChanged:
        const newTrack = await TrackPlayer.getTrack(event.index ?? 0);
        setCurrentTrack(newTrack);
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    TrackPlayer.getActiveTrack().then(setCurrentTrack).catch(console.log);
  }, []);

  return (
    <View style={styles.container}>
      <SongInfo song={currentTrack} />
      <SongSlider />
      <Controllers />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
