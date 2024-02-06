import React from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import type { Track } from "react-native-track-player";

interface SongInfoProps {
  song: Track | null | undefined;
}

const { width } = Dimensions.get("window");

export function SongInfo({ song }: SongInfoProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png", // TODO: update it with song artwork
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
