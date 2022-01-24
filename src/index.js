const POKEMON_LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
const $pokemonListContainer = document.querySelector(".pokemon-list-container");
const $lowerNextButton = document.querySelector(".lower-next-button");
const $lowerPreviousButton = document.querySelector(".lower-previous-button");
const $upperNextButton = document.querySelector(".upper-next-button");
const $upperPreviousButton = document.querySelector(".upper-previous-button");
let nextPokemonList;
let previousPokemonList = null;

function loadPokemonList(pokeApiURL) {
  return fetch(pokeApiURL)
    .then((api_response) => {
      if (!api_response.ok)
        return "Something went wrong, please try again later";
      return api_response.json();
    })
    .then((api_responseJSON) => {
      nextPokemonList = api_responseJSON.next;
      return api_responseJSON.results.forEach((object) => {
        loadSinglePokemon(object.url);
      });
    })
    .catch((error) => console.error(error));
}

function loadSinglePokemon(pokemonURL) {
  return fetch(pokemonURL)
    .then((api_response) => {
      if (!api_response.ok)
        return "Something went wrong, please try again later";
      return api_response.json();
    })
    .then((api_responseJSON) => {
      return createPokemonCard(api_responseJSON);
    })
    .catch((error) => console.error(error));
}

function createPokemonCard(pokemon) {
  const $pokemonCard = document.createElement("div");
  $pokemonCard.classList.add("pokemon-card");
  const $pokemonImage = document.createElement("img");
  $pokemonImage.classList.add("card-img-top", "pokemon-card-image");
  const $pokemonCardBody = document.createElement("div");
  $pokemonCardBody.classList.add("card-body");
  const $pokemonTitle = document.createElement("h5");
  $pokemonTitle.classList.add("pokemon-name");
  const $pokemonDescription = document.createElement("ul");
  $pokemonDescription.classList.add("pokemon-description");
  const $pokemonNumber = document.createElement("li");
  const $pokemonWeight = document.createElement("li");
  const $pokemonHeight = document.createElement("li");

  $pokemonImage.src = pokemon.sprites.front_default;
  $pokemonImage.alt = `An image depicting the front part of pokemon ${capitalizeFirstLetter(
    pokemon.name
  )}`;
  $pokemonTitle.textContent = `${capitalizeFirstLetter(pokemon.name)}`;
  $pokemonNumber.textContent = `Number: ${pokemon.id}`;
  $pokemonWeight.textContent = `Weight: ${pokemon.weight}`;
  $pokemonHeight.textContent = `Height: ${pokemon.height}`;

  $pokemonDescription.appendChild($pokemonNumber);
  $pokemonDescription.appendChild(assessPokemonTypeQuantity(pokemon.types));
  $pokemonDescription.appendChild($pokemonWeight);
  $pokemonDescription.appendChild($pokemonHeight);

  $pokemonCardBody.appendChild($pokemonTitle);
  $pokemonCardBody.appendChild($pokemonDescription);

  $pokemonCard.appendChild($pokemonImage);
  $pokemonCard.appendChild($pokemonCardBody);

  return $pokemonListContainer.appendChild($pokemonCard);
}

function capitalizeFirstLetter(string) {
  const newString = string.charAt(0).toUpperCase() + string.slice(1);
  return newString;
}

function assessPokemonTypeQuantity(typeQuantity) {
  const $pokemonType = document.createElement("li");
  if (typeQuantity.length === 2) {
    $pokemonType.textContent = `Type: ${capitalizeFirstLetter(
      typeQuantity[0].type.name
    )} - ${capitalizeFirstLetter(typeQuantity[1].type.name)}`;
    return $pokemonType;
  } else {
    $pokemonType.textContent = `Type: ${capitalizeFirstLetter(
      typeQuantity[0].type.name
    )}`;
    return $pokemonType;
  }
}

loadPokemonList(POKEMON_LIST_URL);
$lowerNextButton.addEventListener("click", () => {
  deletePreviousPokemonCards();
  loadPokemonList(nextPokemonList);
});

function deletePreviousPokemonCards() {
  const $pokemonCards = document.querySelectorAll(".pokemon-card");
  $pokemonCards.forEach((card) => {
    card.remove();
  });
}
