import type { PressableProps } from "react-native";
import Slider from "@react-native-community/slider";
import type { SliderProps } from "@react-native-community/slider";
import { formatDuration } from "../../utils";
import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TrackPlayer, { useProgress } from "react-native-track-player";

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
        thumbTintColor="#2ECC72"
        minimumTrackTintColor="#2ECC72"
        maximumTrackTintColor="#2ECC72"
        onSlidingComplete={handleSliderThumbComplete}
        onValueChange={handleSliderThumbChange}
      />
      <View style={styles.timeContainer}>
        <Text>
          {formatDuration(isThumbChanging === true ? newPosition : position)}
        </Text>
        <Pressable onPress={handleShowTotalDurationPress}>
          <Text>
            {formatDuration(
              Math.max(
                duration -
                  (showTotalDuration === false
                    ? isThumbChanging === true
                      ? newPosition
                      : position
                    : 0),
                0
              ) // To not to pass negative value
            )}
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
});
