import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import TrackPlayer, { useProgress } from "react-native-track-player";
import type { SliderProps } from "@react-native-community/slider";

export function SongSlider(): JSX.Element {
  const { duration, position } = useProgress();
  const [isThumbChanging, setIsThumbChanging] = useState(false);
  const [newPosition, setNewPosition] = useState(0);

  const handleSliderThumbComplete: SliderProps["onSlidingComplete"] = async (
    value
  ) => {
    setIsThumbChanging(false);
    await TrackPlayer.seekTo(value);
  };

  const handleSliderThumbChange: SliderProps["onValueChange"] = (value) => {
    setIsThumbChanging(true);
    setNewPosition(value);
  };

  return (
    <View>
      <Slider
        value={position}
        maximumValue={duration}
        minimumValue={0}
        thumbTintColor="#FFFFFF"
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#FFFFFF"
        onSlidingComplete={handleSliderThumbComplete}
        onValueChange={handleSliderThumbChange}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.startTime}>
          {new Date((isThumbChanging === true ? newPosition : position) * 1000)
            .toISOString()
            .substring(15, 19)}
        </Text>
        <Text style={styles.endTime}>
          {new Date(
            (duration - (isThumbChanging === true ? newPosition : position)) *
              1000
          )
            .toISOString()
            .substring(15, 19)}
        </Text>
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
