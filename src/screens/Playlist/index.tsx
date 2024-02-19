import MusiclPlaceholderImage from "./music-placeholder.jpg";
import type { PlaylistProps } from "../../routes";
import type { PressableProps } from "react-native";
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
  Text,
  View,
} from "react-native";

export function Playlist({ navigation }: PlaylistProps): JSX.Element {
  const { requestRefetch, loading, tracks } = useMusicFiles();

  const handleReload: PressableProps["onPress"] = async () => {
    requestRefetch().catch(console.log);
  };

  const handleMusicItemClick = async (track: Track) => {
    await TrackPlayer.load(track);
    await TrackPlayer.play();
    navigation.navigate(Routes.Home);
  };

  return (
    <View>
      <Pressable onPress={handleReload}>
        <Text>Reload</Text>
      </Pressable>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={tracks}
          renderItem={(song) => (
            <Pressable
              key={song.item.title}
              onPress={() => handleMusicItemClick(song.item)}
              style={{ width: "100%", padding: 6 }}>
              <View>
                <Image
                  source={
                    song.item.artwork === "" ||
                    song.item.artwork === undefined ||
                    song.item.artwork === null
                      ? MusiclPlaceholderImage
                      : {
                          uri: song.item.artwork,
                        }
                  }
                  style={{ width: 40, height: 40, objectFit: "cover" }}
                />
              </View>
              <View>
                <Text>{song.item.title}</Text>
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
