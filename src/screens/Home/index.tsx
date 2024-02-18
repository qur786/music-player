import { Player } from "../../components/Player";
import { setupPlayer } from "../../../track-player-service";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

export function Home(): JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    setupPlayer().then(setIsPlayerReady).catch(console.log);
  }, []);

  return (
    <View style={styles.main}>
      <Text style={styles.heading}>Music Player</Text>
      {isPlayerReady ? <Player /> : <ActivityIndicator />}
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
