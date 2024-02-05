import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";

export default function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <Text style={styles.heading}>Music Player</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 8,
  },
});
