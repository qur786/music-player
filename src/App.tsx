import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import { Player } from "./components/Player";
import { addTracks, setupPlayer } from "../track-player-service";

const { height } = Dimensions.get("window");

export default function App(): JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    async function setup(): Promise<boolean> {
      const isSetup = await setupPlayer();
      if (isSetup === true) {
        await addTracks([
          {
            title: "Animal Walk bgm",
            url: require("../assets/animal-walk.mp3"),
            artist: "Sandeep Reddy",
            album: "Animal",
            artwork: "assets/animal-wallpaper.jpg",
          },
        ]);
      }

      return isSetup;
    }

    setup().then(setIsPlayerReady).catch(console.log);
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar />
      <Text style={styles.heading}>Music Player</Text>
      {isPlayerReady ? <Player /> : <ActivityIndicator />}
    </SafeAreaView>
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
