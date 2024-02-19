import { MusicPlaceholderImage } from "../MusicProvider/music-placeholder";
import React from "react";
import type { Track } from "react-native-track-player";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

interface SongInfoProps {
  song: Track | null | undefined;
}

const { width } = Dimensions.get("window");

export function SongInfo({ song }: SongInfoProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            song && typeof song.artwork === "string" && song.artwork.length > 0
              ? song.artwork
              : MusicPlaceholderImage,
        }}
        style={styles.artWork}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{song?.title ?? "Title"}</Text>
        <Text>Artist: {song?.artist ?? "Artist"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "65%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  artWork: {
    width: width - 40,
    height: "60%",
    objectFit: "contain",
  },
  infoContainer: { flexDirection: "column", alignItems: "center", gap: 6 },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
