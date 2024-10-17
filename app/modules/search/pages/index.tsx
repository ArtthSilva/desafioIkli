import { SafeAreaView, Text, View, ActivityIndicator, Image, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import { getRandomColor } from "../../../utils/randomColor";
import { FilterTypeModal } from "../components/filterTypeModal";
import { IPokemonWithColor } from "../../../interfaces/pokemon.interface";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../../routes/types";
import { pokemonApi } from "../../../services/PokemonApi";
import { SearchBar } from "../components/searchBar";


export default function Feed() {
    const [pokemons, setPokemons] = useState<IPokemonWithColor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const navigation = useNavigation<propsStack>();

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleTypeSelect = (type: string) => {
        setSelectedType(type);
        setModalVisible(false);
    };

    useEffect(() => {
        fetchPokemons(page);
    }, [page]);

    const fetchPokemons = async (page: number) => {
        setLoadingMore(true);
        try {
            const start = (page - 1) * 10 + 1;
            const end = start + 9;
            const pokemonData = await Promise.all(
                Array.from({ length: end - start + 1 }, (_, i) => pokemonApi.getPokemonById(start + i))
            );
            const coloredPokemons = pokemonData.map((pokemon) => ({
                ...pokemon,
                backgroundColor: getRandomColor(),
            }));
            setPokemons((prev) => [...prev, ...coloredPokemons]);
            setLoading(false);
        } catch (error) {
            setError("Erro ao carregar Pokémons");
        } finally {
            setLoadingMore(false);
        }
    };

    if (loading && page === 1) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    const filteredPokemons = pokemons.filter((pokemon) => {
        const matchesSearchQuery = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType ? pokemon.types.some((type) => type.type.name === selectedType) : true;
        return matchesSearchQuery && matchesType;
    });

    const loadMorePokemons = () => {
        if (!loadingMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <SafeAreaView style={styles.feed}>
            <View style={styles.feed__header}>
                <SearchBar
                    searchQuery={searchQuery}
                    handleSearch={handleSearch}
                    openFilterModal={() => setModalVisible(true)}
                />
            </View>
            <FlatList
                data={filteredPokemons}
                numColumns={3}
                keyExtractor={(item) => item.id.toString()}  
                contentContainerStyle={styles.grid}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.gridItem, { backgroundColor: item.backgroundColor }]}
                        onPress={() => navigation.navigate("Profile", { id: item.id })}
                    >
                        <Image
                            source={{ uri: item.sprites.front_default }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                )}
                onEndReached={loadMorePokemons}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
                style={styles.flatList}
            />
            <FilterTypeModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleTypeSelect={handleTypeSelect}
            />
        </SafeAreaView>
    );
}
