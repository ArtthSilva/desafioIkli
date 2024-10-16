import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    feed: {
        flex: 1,
        backgroundColor: '#000',
        gap: 10,
    },
    feed__header: {
        height: 55,
        width: '100%',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        top: 60,
    },
    searchInput: {
        width: '85%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    grid: {
        paddingTop: 0,
        padding: 5,
        gap: 5,
    },
    gridItem: {
        width: '30%',
        aspectRatio: 1,
        marginBottom: 5,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    flatList: {
        marginTop: 70,  
    },

});
