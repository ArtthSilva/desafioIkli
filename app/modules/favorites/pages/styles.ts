import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    favorites: {
        flex: 1,
        backgroundColor: '#000',
        gap: 10,
    },
    unFavorite: {
        flex: 1,
        backgroundColor: '#000',
        gap: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
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
