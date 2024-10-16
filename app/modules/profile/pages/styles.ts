import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    profile: {
        flex: 1,
        backgroundColor: "#000",
    },
    profile__header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    profile__headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    profile__info: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        padding: 10,
    },
    profile__info__image: {
        paddingTop: 20,
    },
    profile__stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
    },
    profile__stat: {
        alignItems: 'center',
        paddingBottom: 50,
    },
    profile__statLabel: {
        color: 'white',
        fontSize: 14,
    },
    profile__favoriteButtonContainer: {
        padding: 12,
    },
    profile__favoriteButton: {
        backgroundColor: 'blue',
        alignItems: 'center',
        padding: 10,
        borderRadius: 3,
    },
    profile__favoriteButtonText: {
        color: 'white',
    },
    profile__gridIconContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 40,
        padding: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    profile__loadingText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    profile__statInfo: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    profile__gridImages: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
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
});