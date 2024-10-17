// components/SearchBar.tsx
import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./styles";

interface SearchBarProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
  openFilterModal: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, handleSearch, openFilterModal }) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <TouchableOpacity onPress={openFilterModal}>
        <Ionicons name="options" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
