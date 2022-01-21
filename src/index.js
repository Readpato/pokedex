const POKEMON_LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
const POKEMON_LIST_CONTAINER = document.querySelector(
  ".pokemon-list-container"
);

function loadPokemonList(POKEMON_LIST_URL) {
  return fetch(POKEMON_LIST_URL)
    .then((api_response) => {
      if (!api_response.ok)
        return "Something went wrong, please try again later";
      return api_response.json();
    })
    .then((api_responseJSON) => {
      return api_responseJSON.results.forEach((object) => {
        loadSinglePokemon(object.url);
      });
    })
    .catch((error) => console.error(error));
}

function loadSinglePokemon(pokemonURL) {}

loadPokemonList(POKEMON_LIST_URL);
