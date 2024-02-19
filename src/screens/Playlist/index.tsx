import { MusicPlaceholderImage } from "../../components/MusicProvider/music-placeholder";
import type { PlaylistProps } from "../../routes";
import React from "react";
import { Routes } from "../../routes";
import type { Track } from "react-native-track-player";
import TrackPlayer from "react-native-track-player";
import { formatDuration } from "../../utils";
import { useMusicFiles } from "../../components/MusicProvider";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export function Playlist({ navigation }: PlaylistProps): JSX.Element {
  const { loading, tracks } = useMusicFiles();

  const handleMusicItemClick = async (track: Track) => {
    await TrackPlayer.load(track);
    await TrackPlayer.play();
    // TODO: add error handing
    navigation.navigate(Routes.Home);
  };

  return (
    <View style={styles.main}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={tracks}
          contentContainerStyle={styles.listContainer}
          renderItem={(song) => (
            <Pressable
              key={song.item.title}
              onPress={() => handleMusicItemClick(song.item)}
              style={styles.listButton}>
              <View>
                <Image
                  source={{
                    uri:
                      typeof song.item.artwork === "string" &&
                      song.item.artwork.length > 0
                        ? song.item.artwork
                        : MusicPlaceholderImage,
                  }}
                  style={styles.listImage}
                />
              </View>
              <View>
                <Text style={styles.listTitle}>{song.item.title}</Text>
                <Text>
                  Artist: {song.item.artist} | Duration:{" "}
                  {formatDuration(song.item?.duration ?? 0)}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, justifyContent: "center" },
  listContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    width: "95%",
  },
  listButton: {
    padding: 6,
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  listImage: { width: 40, height: 40, objectFit: "cover" },
  listTitle: { color: "#2C3335", fontSize: 16 },
});
