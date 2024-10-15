import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, TextInput, Image, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Pokemon {
    name: string;
    sprites: {
        front_default: string; 
        front_shiny: string; 
    };
    types: {
        type: {
            name: string;
        };
    }[];
    backgroundColor: string;  
}

export default function Feed() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        getPokemons();
    }, []);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getPokemons = () => {
        const endpoints = [];
        for (let i = 1; i < 35; i++) { 
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }

        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then((responses) => {
                const pokemonData = responses.map((res) => ({
                    ...res.data,
                    backgroundColor: getRandomColor()
                }));
                setPokemons(pokemonData);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            </View>
            <FlatList
                data={filteredPokemons}
                numColumns={3}
                keyExtractor={(item) => item.name}
                contentContainerStyle={styles.grid}
                renderItem={({ item }) => (
                    <View style={[styles.gridItem, { backgroundColor: item.backgroundColor }]}>
                        <Image
                            source={{ uri: item.sprites.front_default }}
                            style={styles.image}
                        />
                    </View>
                )}
                style={styles.flatList}  
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    feed: {
        flex: 1,
        backgroundColor: '#000',
        gap: 10,
    },
    feed__header: {
        height: 55,
        width: '100%',
        borderBottomWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 20,
        top: 60,
    },
    searchInput: {
        width: '80%',
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
