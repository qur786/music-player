import { Player } from "../../components/Player";
import { setupPlayer } from "../../../track-player-service";
import { ActivityIndicator, Dimensions, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";

const { height } = Dimensions.get("window");

export function Home(): JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    async function setup(): Promise<boolean> {
      const isSetup = await setupPlayer();
      return isSetup;
    }

    setup().then(setIsPlayerReady).catch(console.log);
  }, []);

  return (
    <>
      <Text style={styles.heading}>Music Player</Text>
      {isPlayerReady ? <Player /> : <ActivityIndicator />}
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    height,
    backgroundColor: "#8395A7",
    paddingVertical: 10,
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
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
