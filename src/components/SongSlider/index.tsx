import React, { useState } from "react";
import type { PressableProps } from "react-native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import TrackPlayer, { useProgress } from "react-native-track-player";
import type { SliderProps } from "@react-native-community/slider";

export function SongSlider(): JSX.Element {
  const { duration, position } = useProgress();
  const [isThumbChanging, setIsThumbChanging] = useState(false);
  const [newPosition, setNewPosition] = useState(0);
  const [showTotalDuration, setShowTotalDuration] = useState(false);

  const handleSliderThumbComplete: SliderProps["onSlidingComplete"] = (
    value
  ) => {
    TrackPlayer.seekTo(value).finally(() => {
      setTimeout(() => {
        setIsThumbChanging(false);
      }, 1000); // Delay is needed otherwise, until the 'isThumbChanging' state becomes true, the progress 'position' variable contains the previous value, so for very brief point of time, we are seeing previous position instead of the new position value
    });
  };

  const handleSliderThumbChange: SliderProps["onValueChange"] = (value) => {
    setIsThumbChanging(true);
    setNewPosition(value);
  };

  const handleShowTotalDurationPress: PressableProps["onPress"] = () => {
    setShowTotalDuration((prev) => !prev);
  };

  return (
    <View>
      <Slider
        value={position}
        maximumValue={duration}
        minimumValue={0}
        thumbTintColor="white"
        minimumTrackTintColor="white"
        maximumTrackTintColor="white"
        onSlidingComplete={handleSliderThumbComplete}
        onValueChange={handleSliderThumbChange}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.startTime}>
          {new Date((isThumbChanging === true ? newPosition : position) * 1000)
            .toISOString()
            .substring(15, 19)}
        </Text>
        <Pressable onPress={handleShowTotalDurationPress}>
          <Text style={styles.endTime}>
            {new Date(
              (duration -
                (showTotalDuration === false
                  ? isThumbChanging === true
                    ? newPosition
                    : position
                  : 0)) *
                1000
            )
              .toISOString()
              .substring(15, 19)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  startTime: {
    color: "white",
  },
  endTime: {
    color: "white",
  },
});
