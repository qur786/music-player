import { MusicPlaceholderImage } from "../../components/MusicProvider/music-placeholder";
import type { PlaylistProps } from "../../routes";
import { Routes } from "../../routes";
import { SearchBar } from "../../components/SearchBar";
import Snackbar from "react-native-snackbar";
import TrackPlayer from "react-native-track-player";
import { formatDuration } from "../../utils";
import { useMusicFiles } from "../../components/MusicProvider";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

export function Playlist({ navigation }: PlaylistProps): JSX.Element {
  const { loading, tracks, requestRefetch } = useMusicFiles();
  const [searchText, setSearchText] = useState("");

  const handleMusicItemClick = async (index: number) => {
    try {
      await TrackPlayer.skip(index); // To load music from the queue
      await TrackPlayer.play();
      navigation.navigate(Routes.Home);
    } catch {
      Snackbar.show({
        text: "Error on loading music",
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  return (
    <View style={styles.main}>
      {tracks.length === 0 ? (
        loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={styles.noSongContainer}>
            <Text>No songs available</Text>
            <Button
              title="Refresh"
              onPress={() => {
                requestRefetch().catch(console.log);
              }}
            />
          </View>
        )
      ) : (
        <FlatList
          data={tracks}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={requestRefetch} />
          }
          keyExtractor={({ url }) => url}
          ListHeaderComponent={
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          }
          renderItem={(song) => (
            <Pressable
              key={song.item.title}
              onPress={() => handleMusicItemClick(song.index)}
              style={[
                styles.listButton,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  display:
                    typeof song.item.title === "string" &&
                    searchText.length > 0 &&
                    !new RegExp(searchText, "i").test(song.item.title)
                      ? "none"
                      : undefined,
                }, // To hide music item that does not matches the search text
              ]}>
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
                <Text style={styles.listTitle} numberOfLines={2}>
                  {song.item.title}
                </Text>
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

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  main: { flex: 1, justifyContent: "center" },
  listContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  listButton: {
    padding: 12,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    height: 76,
  },
  listImage: { width: 40, height: 40, objectFit: "cover" },
  listTitle: { color: "#2C3335", fontSize: 16, width: width - 90 },
  noSongContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
});
