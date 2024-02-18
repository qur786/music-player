import MusiclPlaceholderImage from "./music-placeholder.jpg";
import type { PressableProps } from "react-native";
import React from "react";
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

export function Playlist(): JSX.Element {
  const { requestRefetch, loading, musicFiles } = useMusicFiles();

  const handleReload: PressableProps["onPress"] = async () => {
    requestRefetch().catch(console.log);
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
          data={musicFiles}
          renderItem={(song) => (
            <View key={song.item.title} style={{ width: "100%", padding: 6 }}>
              <View>
                <Image
                  source={
                    song.item.cover === "" ||
                    song.item.cover === undefined ||
                    song.item.cover === null
                      ? MusiclPlaceholderImage
                      : {
                          uri: song.item.cover,
                        }
                  }
                  style={{ width: 40, height: 40, objectFit: "cover" }}
                />
              </View>
              <View>
                <Text>{song.item.title}</Text>
                <Text>
                  Artist: {song.item.artist} | Duration:{" "}
                  {formatDuration(song.item.duration / 1000)}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
