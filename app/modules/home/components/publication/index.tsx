import { View, Text, Image, TouchableOpacity } from "react-native";
import StorieIcon from "../../../../components/stories";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { propsStack } from "../../../../routes/types";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { getRandomColor } from "../../../../utils/randomColor";
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { useEffect, useState } from "react";

export const Publication: React.FC<IPublicationProps> = ({
    imagePublication,
    typePokemon,
    pokemonName,
    pokemonProfileImg,
    pokemonId,
}) => {
    const backgroundColor = getRandomColor();
    const navigation = useNavigation<propsStack>();  
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        checkIfFavorite(pokemonId);
    }, []);

    const toggleFavorite = async () => {
        try {
            let favorites = await AsyncStorage.getItem('favorites');
            let favoritesArray = favorites ? JSON.parse(favorites) : [];

            if (isFavorite) {
                favoritesArray = favoritesArray.filter((id: number) => id !== pokemonId);
            } else {
                favoritesArray.push(pokemonId);
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Erro ao salvar favoritos", error);
        }
    };

    const checkIfFavorite = async (id: number) => {
        try {
            const favorites = await AsyncStorage.getItem('favorites');
            const favoritesArray = favorites ? JSON.parse(favorites) : [];
            setIsFavorite(favoritesArray.includes(id));
        } catch (error) {
            console.error("Erro ao verificar favoritos", error);
        }
    };

    return (
        <View style={styles.publication}>
            <View style={styles.publicationHeader}>
                <View>
                    <StorieIcon imageUrl={pokemonProfileImg} size={40} paddingBottom={0} />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile', { id: pokemonId })}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.pokemonName}>{pokemonName}</Text>
                        <Text style={styles.typePokemon}>{typePokemon}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: backgroundColor }}>
                <Image
                    source={{ uri: imagePublication }}
                    style={styles.publicationImage}
                />
            </View>
            <View style={styles.publicationFooter}>
            <TouchableOpacity onPress={toggleFavorite}>
                <MaterialIcons
                    name={isFavorite ? "favorite" : "favorite-border"}
                    size={24}
                    color="red"
                />
            </TouchableOpacity>
            </View>
        </View>
    );
};
