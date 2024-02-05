import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import { Controllers } from "./components/Controllers";
import { addTracks, setupPlayer } from "../track-player-service";

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
            artwork: "./assets/animal-wallpaper.jpg",
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
      {isPlayerReady ? <Controllers /> : <ActivityIndicator />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
  },
  heading: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 8,
  },
});
