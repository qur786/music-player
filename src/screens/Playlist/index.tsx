import MusiclPlaceholderImage from "./music-placeholder.jpg";
import type { PressableProps } from "react-native";
import { formatDuration } from "../../utils";
import {
  ActivityIndicator,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  SortSongFields,
  SortSongOrder,
  getAll,
} from "react-native-get-music-files";

type MusicFile = Exclude<Awaited<ReturnType<typeof getAll>>, string>;

export function Playlist(): JSX.Element {
  const [musics, setMusics] = useState<MusicFile>([]);
  const [isMusicFilesLoading, setIsMusicFilesLoading] = useState(false);

  const handleReload: PressableProps["onPress"] = async () => {
    setIsMusicFilesLoading(true);
    let isMusicFilesReadPermissions = false;
    let isExternalStorageReadPermissions = false;
    if (Platform.OS === "android") {
      isMusicFilesReadPermissions = await PermissionsAndroid.check(
        "android.permission.READ_MEDIA_AUDIO"
      );

      isExternalStorageReadPermissions = await PermissionsAndroid.check(
        "android.permission.READ_EXTERNAL_STORAGE"
      );

      if (isMusicFilesReadPermissions === false) {
        const result = await PermissionsAndroid.request(
          "android.permission.READ_MEDIA_AUDIO",
          {
            title: "Music player audio files read permission.",
            message: "App needs to access local audio files.",
            buttonPositive: "Ask me later",
            buttonNegative: "Cancel",
            buttonNeutral: "Ok",
          }
        );

        isMusicFilesReadPermissions =
          result === PermissionsAndroid.RESULTS.GRANTED;
      }

      if (isExternalStorageReadPermissions === false) {
        const result = await PermissionsAndroid.request(
          "android.permission.READ_EXTERNAL_STORAGE",
          {
            title: "Music player external storage permission.",
            message: "App needs to access local files.",
            buttonPositive: "Ask me later",
            buttonNegative: "Cancel",
            buttonNeutral: "Ok",
          }
        );
        isExternalStorageReadPermissions =
          result === PermissionsAndroid.RESULTS.GRANTED;
      }
    }

    // TODO: add permission handler for other OS when creating app for those envs.

    if (isMusicFilesReadPermissions) {
      const songsResults = await getAll({
        coverQuality: 80,
        minSongDuration: 1000,
        sortOrder: SortSongOrder.DESC,
        sortBy: SortSongFields.TITLE,
      });

      if (typeof songsResults === "string") {
        console.log(songsResults);
        // TODO: notify user that could not find any music files
      } else {
        setMusics(songsResults);
      }
    } else {
      // TODO: notify user that user needs to allow permission to access music files.
    }
    setIsMusicFilesLoading(false);
  };

  return (
    <View>
      <Pressable onPress={handleReload}>
        <Text>Reload</Text>
      </Pressable>
      {isMusicFilesLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={musics}
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
