import { SafeAreaView, StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import StorieIcon from './src/components/Stories';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string; 
  };
}

export default function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    const endpoints = [];
    for (let i = 1; i < 20; i++) { 
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((responses) => {
        const pokemonData = responses.map((res) => res.data);
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

  return (
    <SafeAreaView style={styles.home}>
      <View style={styles.home__header}>
        <Text style={styles.home__headerText}>IkliDex</Text>
      </View>
      <ScrollView horizontal style={styles.home__stories}>
        {pokemons.map((pokemon, index) => (
          <StorieIcon
            key={index}
            imageUrl={pokemon.sprites.front_default} 
            size={75}                             
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#000',
  },
  home__header: {
    position: 'absolute',
    top: 50,
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  home__headerText: {
    textAlign: 'left',
    color: 'white',
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  home__stories: {
    marginTop: 115,
  },
  story: {
 
  },
});
