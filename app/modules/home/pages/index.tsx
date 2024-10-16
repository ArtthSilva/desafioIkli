import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import StorieIcon from '../../../components/stories';
import { useEffect, useState } from 'react';
import { Publication } from '../components/publication/index';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../../routes/types';
import { IPokemon } from '../../../interfaces/pokemon.interface';
import { pokemonApi } from '../../../services/PokemonApi';
import { styles } from "./styles";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Home() {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigation = useNavigation<propsStack>();  

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
      const pokemonData = [];
      for (let i = 1; i <= 15; i++) {
        const data = await pokemonApi.getPokemonById(i);  
        pokemonData.push(data);
      }
      setPokemons(pokemonData);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido');
      }
      setLoading(false);
    }
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
        <MaterialIcons name="favorite-border" size={24} color="white" />
      </View>
      <ScrollView horizontal style={styles.home__stories}>
        {pokemons.map((pokemon) => (
          <TouchableOpacity
          key={pokemon.id} 
          onPress={() => navigation.navigate('Profile', { id: pokemon.id })}
          >
            <StorieIcon
              imageUrl={pokemon.sprites.front_default}
              size={75}
              pokemonName={pokemon.name}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.home__publications}>
        {pokemons.map((pokemon, index) => (
          <Publication
            key={index}
            imagePublication={pokemon.sprites.front_shiny}
            typePokemon={pokemon.types[0].type.name}
            pokemonName={pokemon.name}
            pokemonProfileImg={pokemon.sprites.front_default}
            pokemonId={pokemon.id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
