import { createPokemonCard, createCatchCardError } from "./ui.js";

export const nextPokemonList = {};
export const previousPokemonList = {};

export async function loadPokemonList(apiURL) {
  try {
    const response = await fetch(apiURL);
    const json = await response.json();
    const { results: results } = json;
    nextPokemonList.url = json.next;
    previousPokemonList.url = json.previous;
    return results.forEach((object) => {
      loadSinglePokemon(object.url);
    });
  } catch {
    return createCatchCardError("Something went wrong. Try again later!");
  }
}

export async function loadSinglePokemon(pokemonURL) {
  try {
    const response = await fetch(pokemonURL);
    const json = await response.json();
    return createPokemonCard(json);
  } catch {
    return createCatchCardError("That Pokemon doesn't exist. Try again.");
  }
}
