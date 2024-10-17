import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para obter os favoritos
export const getFavorites = async (): Promise<number[]> => {
    try {
        const favorites = await AsyncStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error("Erro ao buscar favoritos", error);
        return [];
    }
};

// Função para verificar se um Pokémon é favorito
export const isFavorite = async (pokemonId: number): Promise<boolean> => {
    try {
        const favorites = await getFavorites();
        return favorites.includes(pokemonId);
    } catch (error) {
        console.error("Erro ao verificar favoritos", error);
        return false;
    }
};

// Função para alternar o estado de favorito (adicionar/remover)
export const toggleFavorite = async (pokemonId: number, currentStatus: boolean): Promise<void> => {
    try {
        let favorites = await getFavorites();

        if (currentStatus) {
            // Se o Pokémon é favorito, removê-lo
            favorites = favorites.filter(id => id !== pokemonId);
        } else {
            // Se não é favorito, adicioná-lo
            favorites.push(pokemonId);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
        console.error("Erro ao alterar favoritos", error);
    }
};
