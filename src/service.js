import { createPokemonCard } from "./ui.js";

export const nextPokemonList = {};
export const previousPokemonList = {};

export async function loadPokemonList(apiURL) {
  const response = await fetch(apiURL);
  const json = await response.json();
  const { results: results } = json;
  nextPokemonList.url = json.next;
  previousPokemonList.url = json.previous;
  return results.forEach((object) => {
    loadSinglePokemon(object.url);
  });
}

export async function loadSinglePokemon(pokemonURL) {
  const response = await fetch(pokemonURL);
  const json = await response.json();
  return createPokemonCard(json);
}

export async function loadSearchBarPokemon(pokemonSearchURL) {
  const response = await fetch(pokemonSearchURL);
  const json = await response.json();
  return createPokemonCard(json);
}
