import { Controllers } from "../Controllers";
import React from "react";
import { SongInfo } from "../SongInfo";
import { SongSlider } from "../SongSlider";
import { StyleSheet, View } from "react-native";

export function Player(): JSX.Element {
  return (
    <View style={styles.container}>
      <SongInfo />
      <SongSlider />
      <Controllers />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "80%",
  },
});
