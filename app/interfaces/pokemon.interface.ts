export interface IPokemon {
    id: number;
    name: string;
    weight: number;
    height: number;
    sprites: {
        front_default: string;
        back_default: string;
        front_shiny: string;
        back_shiny: string;
    };
    types: {
        type: {
            name: string;
        };
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}

export interface IPokemonWithColor extends IPokemon {
    backgroundColor: string;
}
