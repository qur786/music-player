import { Player } from "../../components/Player";
import React from "react";
import { StyleSheet, View } from "react-native";

export function Home(): JSX.Element {
  return (
    <View style={styles.main}>
      <Player />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingVertical: 10,
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    height: 900,
  },
});
