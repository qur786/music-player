import React from "react";
import { View, Text } from "react-native";
import type { Track } from "react-native-track-player";

interface SongInfoProps {
  song: Track | null | undefined;
}

export function SongInfo({ song }: SongInfoProps): JSX.Element {
  return (
    <View>
      <View>
        <Text>{song?.title}</Text>
      </View>
      <View>
        <Text>
          {song?.artist} . {song?.album}
        </Text>
      </View>
    </View>
  );
}
