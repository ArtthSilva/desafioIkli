import { SafeAreaView, Text, View, ActivityIndicator, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./styles";
import { getRandomColor } from "../../../utils/randomColor";
import { FilterTypeModal } from "../components/filterTypeModal";
import { IPokemonWithColor } from "../../../interfaces/pokemon.interface";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../../routes/types";
 

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
        getPokemons();
    }, [page]);   

    const getPokemons = () => {
        setLoadingMore(true);   

        const endpoints = [];
        const start = (page - 1) * 10 + 1;
        const end = start + 9;

        for (let i = start; i <= end; i++) { 
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }

        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then((responses) => {
                const pokemonData = responses.map((res) => ({
                    ...res.data,
                    backgroundColor: getRandomColor()
                }));
                setPokemons(prev => [...prev, ...pokemonData]);  
                setLoading(false);
                setLoadingMore(false);  
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
                setLoadingMore(false);   
            });
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
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="options" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredPokemons}
                numColumns={3}
                keyExtractor={(item) => item.name}
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
