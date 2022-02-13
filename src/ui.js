import { capitalizeFirstLetter, assessPokemonTypeQuantity } from "./logic.js";

export function createPokemonCard(pokemon) {
  const $pokemonListContainer = document.querySelector(
    ".pokemon-list-container"
  );
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

export function createCatchCardError() {
  const $pokemonSearchInput = document.querySelector(".pokemon-search-input");
  const $errorPokemonCard = document.querySelector(".error-pokemon-card");
  $pokemonSearchInput.value = "";
  $pokemonSearchInput.classList.add("error");
  showElement($errorPokemonCard);
  const $errorDescription = document.querySelector(".error-description");
  $errorDescription.textContent = "That Pokemon doesn't exist. Try again.";
}

export function deletePreviousPokemonCards() {
  const $pokemonCards = document.querySelectorAll(".pokemon-card");
  $pokemonCards.forEach((card) => {
    card.remove();
  });
}

export function hideElement(element) {
  element.classList.add("hidden");
}

export function showElement(element) {
  element.classList.remove("hidden");
}
