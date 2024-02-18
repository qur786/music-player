import type { PressableProps } from "react-native";
import { FlatList, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import {
  SortSongFields,
  SortSongOrder,
  getAll,
} from "react-native-get-music-files";

type MusicFile = Exclude<Awaited<ReturnType<typeof getAll>>, string>;

export function Playlist(): JSX.Element {
  const [musics, setMusics] = useState<MusicFile>([]);

  const handleReload: PressableProps["onPress"] = async () => {
    // TODO: check premission
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
  };

  return (
    <View>
      <Pressable onPress={handleReload}>
        <Text>Reload</Text>
      </Pressable>
      <FlatList
        data={musics}
        renderItem={(song) => (
          <View>
            <Text>{Object.values(song).join(", ")}</Text>
          </View>
        )}
      />
    </View>
  );
}
