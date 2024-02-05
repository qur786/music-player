import React, { useCallback } from "react";
import type { ButtonProps } from "react-native";
import { View, Button, StyleSheet } from "react-native";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";

export function Player(): JSX.Element {
  const playbackState = usePlaybackState();

  const handlePrevPress: ButtonProps["onPress"] = async () => {
    await TrackPlayer.skipToPrevious();
  };
  const handleNextPress: ButtonProps["onPress"] = async () => {
    await TrackPlayer.skipToNext();
  };
  const handleTogglePlayPause: ButtonProps["onPress"] =
    useCallback(async () => {
      const currentTrack = await TrackPlayer.getActiveTrack();

      if (currentTrack) {
        if (
          playbackState.state === State.Paused ||
          playbackState.state === State.Ready
        ) {
          await TrackPlayer.play();
        } else {
          await TrackPlayer.pause();
        }
      }
    }, [playbackState]);
  return (
    <View style={styles.player}>
      <Button title="Prev" onPress={handlePrevPress} />
      <Button
        title={playbackState.state === State.Playing ? "Pause" : "Play"}
        onPress={handleTogglePlayPause}
      />
      <Button title="Next" onPress={handleNextPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "red",
    alignItems: "flex-start",
    gap: 10,
  },
});
