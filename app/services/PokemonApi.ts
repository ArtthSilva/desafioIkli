import { api } from "./api";

export const pokemonApi = {
  getPokemonById: async (id: number) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;  
    } catch (error) {
      console.error(`Erro ao buscar o Pokémon com id ${id}:`, error);
      throw error;  
    }
  },
};
