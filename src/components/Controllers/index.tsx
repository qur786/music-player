import React, { useCallback } from "react";
import type { PressableProps } from "react-native";
import { View, StyleSheet, Pressable } from "react-native";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import Icon from "react-native-vector-icons/MaterialIcons";

export function Controllers(): JSX.Element {
  const playbackState = usePlaybackState();

  const handlePrevPress: PressableProps["onPress"] = async () => {
    await TrackPlayer.skipToPrevious();
  };
  const handleNextPress: PressableProps["onPress"] = async () => {
    await TrackPlayer.skipToNext();
  };
  const handleTogglePlayPause: PressableProps["onPress"] =
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
      <Pressable onPress={handlePrevPress}>
        <Icon name="skip-previous" size={40} color="#7CEC9F" />
      </Pressable>
      <Pressable onPress={handleTogglePlayPause}>
        <Icon
          name={
            playbackState.state === State.Playing
              ? "pause-circle"
              : "play-circle"
          }
          size={40}
          color="#25CCF7"
        />
      </Pressable>
      <Pressable onPress={handleNextPress}>
        <Icon name="skip-next" size={40} color="#7CEC9F" />
      </Pressable>
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
