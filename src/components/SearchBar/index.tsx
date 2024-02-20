import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import type { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

export function SearchBar({
  searchText,
  setSearchText,
}: SearchBarProps): JSX.Element {
  const handleClearSearchText = () => {
    setSearchText("");
  };
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
        color="gray"
        onPress={handleClearSearchText}
      />
    </View>
  );
}

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderColor: "#CCCCCC",
  },
  input: {
    flexBasis: width - 90,
    overflow: "hidden",
  },
});
