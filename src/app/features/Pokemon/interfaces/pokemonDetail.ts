export interface PokemonStat {
base_stat: number;
stat: { name: string };
}

export interface PokemonTypeContainer {
type: { name: string };
}

export interface PokemonAbilityContainer {
is_hidden: boolean;
ability: { name: string };
}


export interface PokemonDetail {
id: number;
name: string;

// Requisitos del proyecto
base_experience: number;
height: number;
weight: number;
order: number; 

  // Estructura
sprites: {
front_default: string;
back_default: string; 
};
types: PokemonTypeContainer[];
stats: PokemonStat[];
abilities: PokemonAbilityContainer[];
moves: any[]; 
}