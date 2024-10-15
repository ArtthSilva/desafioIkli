import { View, Text, Image, StyleSheet } from "react-native";
import StorieIcon from "./Stories";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface PublicationProps {
    imagePublication: string;
    typePokemon?: string;
    pokemonName?: string;
    descPokemon?: string;
    pokemonProfileImg: string;
}

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const Publication: React.FC<PublicationProps> = ({
    imagePublication,
    typePokemon,
    pokemonName,
    descPokemon,
    pokemonProfileImg,

    
}) => {
    const backgroundColor = getRandomColor();

    return (
        <View style={styles.publication}>
            <View style={styles.publicationHeader}>
                <View>
                    <StorieIcon imageUrl={pokemonProfileImg} size={40} paddingBottom={0} />
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.headerText}>{pokemonName}</Text>
                    <Text style={styles.headerText}>{typePokemon}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: backgroundColor }}>
                <Image
                    source={{ uri: imagePublication }}
                    style={styles.publicationImage}
                />
            </View>
            <View style={styles.publicationFooter}>
                <MaterialIcons name="favorite-border" size={24} color="white" />
                <Text style={styles.desc}>{descPokemon}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    publication: {
        marginBottom: 30,
        paddingTop: 20,
    },
    publicationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        height: 50,
    },
    userInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        display: 'flex',
        paddingBottom: 30,

    },
    headerText: {
        color: '#fff',
    },
    publicationImage: {
        width: '100%',
        height: 390,
    },
    desc: {
        color: '#fff',
    },
    publicationFooter: {
        paddingLeft: 20,
        marginTop: 15
    },
});
