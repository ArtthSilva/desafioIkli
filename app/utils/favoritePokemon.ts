import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFavorites = async (): Promise<number[]> => {
    try {
        const favorites = await AsyncStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error("Erro ao buscar favoritos", error);
        return [];
    }
};

export const isFavorite = async (pokemonId: number): Promise<boolean> => {
    try {
        const favorites = await getFavorites();
        return favorites.includes(pokemonId);
    } catch (error) {
        console.error("Erro ao verificar favoritos", error);
        return false;
    }
};

export const toggleFavorite = async (pokemonId: number, currentStatus: boolean): Promise<void> => {
    try {
        let favorites = await getFavorites();

        if (currentStatus) {
            favorites = favorites.filter(id => id !== pokemonId);
        } else {
            favorites.push(pokemonId);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
        console.error("Erro ao alterar favoritos", error);
    }
};
