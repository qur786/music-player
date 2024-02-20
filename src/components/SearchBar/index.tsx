import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import type { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

export function SearchBar({
  searchText,
  setSearchText,
}: SearchBarProps): JSX.Element {
  return (
    <View style={styles.container}>
      <MaterialIcon name="search" size={26} color="gray" />
      <TextInput
        placeholder="Search songs"
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
      />
      <MaterialIcon
        name="close"
        size={26}
        color="green"
        onPress={() => {
          setSearchText("");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    borderColor: "#CCCCCC",
  },
  input: {
    flexGrow: 2,
    overflow: "hidden",
  },
});
