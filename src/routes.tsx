import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

export type RootStackParamList = {
  Home: undefined;
  Playlist: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type PlaylistProps = NativeStackScreenProps<
  RootStackParamList,
  "Playlist"
>;

function HomeTabBarIcon({
  color,
  size,
}: {
  color: string;
  size: number;
  focused: boolean;
}): JSX.Element {
  return <MaterialIcon name="home" color={color} size={size} />;
}

function PlaylistTabBarIcon({
  color,
  size,
}: {
  color: string;
  size: number;
  focused: boolean;
}): JSX.Element {
  return <MaterialIcon name="playlist-play" color={color} size={size} />;
}

export const Routes = {
  Home: "Home",
  Playlist: "Playlist",
} as const;

export const RoutesIcons = {
  Home: HomeTabBarIcon,
  Playlist: PlaylistTabBarIcon,
} as const;
