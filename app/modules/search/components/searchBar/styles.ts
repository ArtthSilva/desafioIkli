import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
    searchInput: {
        width: '90%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    }
});