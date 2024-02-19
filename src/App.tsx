import { Home } from "./screens/Home";
import { MusicProvider } from "./components/MusicProvider";
import { NavigationContainer } from "@react-navigation/native";
import { Playlist } from "./screens/Playlist";
import React from "react";
import type { RootStackParamList } from "./routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Routes, RoutesIcons } from "./routes";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <MusicProvider>
      <NavigationContainer>
        <Navigator
          initialRouteName={Routes.Playlist}
          screenOptions={{
            tabBarActiveTintColor: "#E74292",
            tabBarHideOnKeyboard: true,
            headerTitleAlign: "center",
            headerTitle: "Music Player",
          }}>
          <Screen
            name={Routes.Home}
            component={Home}
            options={{
              tabBarIcon: RoutesIcons.Home,
            }}
          />
          <Screen
            name={Routes.Playlist}
            component={Playlist}
            options={{
              tabBarIcon: RoutesIcons.Playlist,
            }}
          />
        </Navigator>
      </NavigationContainer>
    </MusicProvider>
  );
}
