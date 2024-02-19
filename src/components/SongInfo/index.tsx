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
        <Text style={styles.artistAlbum}>
          {song?.artist ?? "Artist"} - {song?.album ?? "Album"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "70%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
    paddingVertical: 16,
  },
  artWork: {
    width: width - 20,
    height: "80%",
    objectFit: "contain",
  },
  infoContainer: { flexDirection: "column", alignItems: "center", gap: 6 },
  artistAlbum: {
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
