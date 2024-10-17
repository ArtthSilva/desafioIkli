import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    publication: {
        marginBottom: 70,
        paddingTop: 20,
    },
    publicationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        height: 50,
    },
 
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: -25,
    },
    pokemonName: {
        color: '#fff',
        fontWeight: 'bold',
    },
    typePokemon: {
        color: '#aaa',
    },
    publicationImage: {
        width: '100%',
        height: 390,
    },
 
});
