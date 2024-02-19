/* eslint-disable @typescript-eslint/no-unused-vars */
import Icon from "react-native-vector-icons/MaterialIcons";
import type { PressableProps } from "react-native";
import { Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import TrackPlayer, {
  RepeatMode,
  State,
  usePlaybackState,
} from "react-native-track-player";

const RepeatModeIcons: Record<RepeatMode, string> = {
  [RepeatMode.Off]: "sync-disabled",
  [RepeatMode.Queue]: "sync",
  [RepeatMode.Track]: "repeat-one",
};

const RepeatModeQueue: RepeatMode[] = [
  RepeatMode.Off,
  RepeatMode.Queue,
  RepeatMode.Track,
];

export function Controllers(): JSX.Element {
  const playbackState = usePlaybackState();
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(RepeatMode.Off);

  const handlePrevPress: PressableProps["onPress"] = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const handleNextPress: PressableProps["onPress"] = async () => {
    await TrackPlayer.skipToNext();
  };

  const handleJumpForwardPress: PressableProps["onPress"] = async () => {
    await TrackPlayer.seekBy(10);
  };

  const handleJumpBackwardPress: PressableProps["onPress"] = async () => {
    await TrackPlayer.seekBy(-10);
  };

  const handleTogglePlayPause: PressableProps["onPress"] = async () => {
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
  };

  const handleRepeatModePress: PressableProps["onPress"] = () => {
    setRepeatMode((prev) => {
      const index = RepeatModeQueue.findIndex((ele) => ele === prev);
      const newIndex = index === RepeatModeQueue.length - 1 ? 0 : index + 1;
      const newRepeatMode = RepeatModeQueue[newIndex];
      TrackPlayer.setRepeatMode(newRepeatMode);
      return newRepeatMode;
    });
  };

  useEffect(() => {
    TrackPlayer.getRepeatMode().then(setRepeatMode).catch(console.log);
  }, []); // Setting up the repeat mode in the state for the first time

  return (
    <View style={styles.container}>
      <View style={styles.playerContainer}>
        <Pressable onPress={handleJumpBackwardPress}>
          <Icon name="replay-10" size={30} color="#25CCF7" />
        </Pressable>
        <Pressable onPress={handlePrevPress}>
          <Icon name="skip-previous" size={40} color="black" />
        </Pressable>
        <Pressable onPress={handleTogglePlayPause}>
          <Icon
            name={
              playbackState.state === State.Playing
                ? "pause-circle"
                : "play-circle"
            }
            size={60}
            color="#E74292"
          />
        </Pressable>
        <Pressable onPress={handleNextPress}>
          <Icon name="skip-next" size={40} color="black" />
        </Pressable>
        <Pressable onPress={handleJumpForwardPress}>
          <Icon name="forward-10" size={30} color="#25CCF7" />
        </Pressable>
      </View>
      {/* TODO: add it back
      <Pressable onPress={handleRepeatModePress}>
        <Icon name={RepeatModeIcons[repeatMode]} size={20} color="#E74292" />
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  playerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});
