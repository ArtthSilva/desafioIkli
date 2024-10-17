import { SafeAreaView, Text, ActivityIndicator, Image, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import { getRandomColor } from "../../../utils/randomColor";
import { IPokemonWithColor } from "../../../interfaces/pokemon.interface";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../../routes/types";
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { pokemonApi } from "../../../services/PokemonApi";

export default function Favorites() {
    const [pokemons, setPokemons] = useState<IPokemonWithColor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);  
    const navigation = useNavigation<propsStack>();

    useEffect(() => {
        loadFavorites();
    }, []);

    useEffect(() => {
        if (favorites.length > 0) {
            getPokemons();  
        }
    }, [favorites]);

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            setFavorites(parsedFavorites);
        } catch (error) {
            console.error("Erro ao carregar favoritos", error);
        } finally {
            setLoading(false); 
        }
    };

    const getPokemons = async () => {
        setLoading(true);
        try {
            const pokemonPromises = favorites.map(id => pokemonApi.getPokemonById(id));
            const pokemonData = await Promise.all(pokemonPromises);
            const enrichedPokemonData = pokemonData.map(data => ({
                ...data,
                backgroundColor: getRandomColor()
            }));
            setPokemons(enrichedPokemonData);
        } catch (err) {
            setError("Erro ao carregar pokémons favoritos");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.unFavorite}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return(
            <SafeAreaView style={styles.unFavorite}>
                <Text style={{color: 'white'}}>{error}</Text>
            </SafeAreaView>
        );
    }

    if (pokemons.length === 0) {
        return (
            <SafeAreaView style={styles.unFavorite}>
                <Text style={{color: 'white'}}>No favorite Pokémon found.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.favorites}>
            <FlatList
                data={pokemons}
                numColumns={3}
                keyExtractor={(item) => item.name}
                contentContainerStyle={styles.grid}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.gridItem, { backgroundColor: item.backgroundColor }]}
                        onPress={() => navigation.navigate("Profile", { id: item.id })}
                    >
                        <Image 
                            source={{ uri: item.sprites.front_default }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                )}
                style={styles.flatList}
            />
        </SafeAreaView>
    );
}
