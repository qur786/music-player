import React from "react";
import { View, Text } from "react-native";
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
      />
      <View>
        <Text>{new Date(position * 1000).toISOString().substring(15, 19)}</Text>
      </View>
      <View>
        <Text>
          {new Date((duration - position) * 1000)
            .toISOString()
            .substring(15, 19)}
        </Text>
      </View>
    </View>
  );
}
