import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Playlist: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type PlaylistProps = NativeStackScreenProps<
  RootStackParamList,
  "Playlist"
>;

export const Routes = {
  Home: "Home",
  Playlist: "Playlist",
} as const;
