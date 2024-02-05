import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";
import { addTracks, setupPlayer } from "../track-player-service";

export default function App(): JSX.Element {
  const [, setIsPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    async function setup(): Promise<boolean> {
      const isSetup = await setupPlayer();
      if (isSetup === true) {
        await addTracks([
          {
            title: "Animal Walk bgm",
            url: require("./assets/animal walk.mp3"),
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
    <SafeAreaView>
      <StatusBar />
      <Text style={styles.heading}>Music Player</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 8,
  },
});
