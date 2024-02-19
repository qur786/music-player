import type { HomeProps } from "../../routes";
import { Player } from "../../components/Player";
import type { PressableProps } from "react-native";
import React from "react";
import { Routes } from "../../routes";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function Home({ navigation }: HomeProps): JSX.Element {
  const handlePlaylistNavigation: PressableProps["onPress"] = () => {
    navigation.navigate(Routes.Playlist);
  };
  return (
    <View style={styles.main}>
      <Pressable onPress={handlePlaylistNavigation}>
        <Text>Playlist</Text>
      </Pressable>
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
