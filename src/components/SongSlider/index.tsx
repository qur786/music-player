import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { useProgress } from "react-native-track-player";

export function SongSlider(): JSX.Element {
  const { duration, position } = useProgress();
  return (
    <View>
      <Slider
        value={position}
        maximumValue={duration}
        minimumValue={0}
        thumbTintColor="#FFFFFF"
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#FFFFFF"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.startTime}>
          {new Date(position * 1000).toISOString().substring(15, 19)}
        </Text>
        <Text style={styles.endTime}>
          {new Date((duration - position) * 1000)
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
