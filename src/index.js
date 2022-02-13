import { loadPokemonList } from "./service.js";

async function initialize() {
  const POKEMON_LIST_URL =
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
  loadPokemonList(POKEMON_LIST_URL);
}

initialize();
