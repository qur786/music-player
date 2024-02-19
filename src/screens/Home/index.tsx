import { Player } from "../../components/Player";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function Home(): JSX.Element {
  return (
    <View style={styles.main}>
      <Text style={styles.heading}>
        <Text>Music Player</Text>
      </Text>
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
    backgroundColor: "#8395A7",
  },
  heading: {
    textAlign: "center",
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    paddingVertical: 8,
    fontFamily: "cursive",
  },
});
