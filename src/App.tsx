import { Home } from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { Playlist } from "./screens/Playlist";
import type { PressableProps } from "react-native";
import React from "react";
import type { RootStackParamList } from "./routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MusicProvider, useMusicFiles } from "./components/MusicProvider";
import { Pressable, Text } from "react-native";
import { Routes, RoutesIcons } from "./routes";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HeaderRefreshButton(): JSX.Element {
  const { requestRefetch } = useMusicFiles();

  const handleRefreshPress: PressableProps["onPress"] = () => {
    requestRefetch().catch(console.log);
  };
  return (
    <Pressable
      onPress={handleRefreshPress}
      android_ripple={{ color: "#E74292" }}>
      <Text>Reload</Text>
      {/* TODO: use icon */}
    </Pressable>
  );
}

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
