import { Dimensions } from "react-native";
import { Home } from "./screens/Home";
import { MusicProvider } from "./components/MusicProvider";
import { NavigationContainer } from "@react-navigation/native";
import { Playlist } from "./screens/Playlist";
import React from "react";
import type { RootStackParamList } from "./routes";
import { Routes } from "./routes";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const { height } = Dimensions.get("window");

export default function App(): JSX.Element {
  return (
    <MusicProvider>
      <NavigationContainer>
        <Navigator
          initialRouteName={Routes.Playlist}
          screenOptions={{
            headerShown: false,
            contentStyle: styles.main,
          }}>
          <Screen name={Routes.Home} component={Home} />
          <Screen name={Routes.Playlist} component={Playlist} />
        </Navigator>
      </NavigationContainer>
    </MusicProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    height,
  },
});
