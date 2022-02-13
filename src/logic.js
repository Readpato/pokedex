import {
  nextPokemonList,
  previousPokemonList,
  loadPokemonList,
} from "./service.js";
import { validateForm } from "./form-validators.js";
import { hideElement, showElement, deletePreviousPokemonCards } from "./ui.js";

export function capitalizeFirstLetter(string) {
  const newString = string.charAt(0).toUpperCase() + string.slice(1);
  return newString;
}

export function assessPokemonTypeQuantity(typeQuantity) {
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

const $lowerNextButton = document.querySelector(".lower-next-button");
$lowerNextButton.addEventListener("click", () => {
  if (nextPokemonList.url === null) return function () {};
  deletePreviousPokemonCards();
  loadPokemonList(nextPokemonList.url);
});

const $upperNextButton = document.querySelector(".upper-next-button");
$upperNextButton.addEventListener("click", () => {
  if (nextPokemonList.url === null) return function () {};
  deletePreviousPokemonCards();
  loadPokemonList(nextPokemonList.url);
});

const $lowerPreviousButton = document.querySelector(".lower-previous-button");
$lowerPreviousButton.addEventListener("click", () => {
  if (previousPokemonList.url === null) return function () {};
  deletePreviousPokemonCards();
  loadPokemonList(previousPokemonList.url);
});

const $upperPreviousButton = document.querySelector(".upper-previous-button");
$upperPreviousButton.addEventListener("click", () => {
  if (previousPokemonList.url === null) return function () {};
  deletePreviousPokemonCards();
  loadPokemonList(previousPokemonList.url);
});

const $pokemonSearchButton = document.querySelector(".pokemon-search-button");
$pokemonSearchButton.addEventListener("click", (event) => {
  event.preventDefault();
  return validateForm();
});

const $homepageButton = document.querySelector(".homepage-button");
$homepageButton.addEventListener("click", (event) => {
  const POKEMON_LIST_URL =
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
  const $errorPokemonCard = document.querySelector(".error-pokemon-card");
  const $pokemonSearchInput = document.querySelector(".pokemon-search-input");
  const $upperNextButton = document.querySelector(".upper-next-button");
  const $upperPreviousButton = document.querySelector(".upper-previous-button");
  const $lowerNextButton = document.querySelector(".lower-next-button");
  const $lowerPreviousButton = document.querySelector(".lower-previous-button");
  const $homepageButton = document.querySelector(".homepage-button");
  deletePreviousPokemonCards();
  $pokemonSearchInput.classList.remove("error");
  showElement($lowerNextButton);
  showElement($lowerPreviousButton);
  showElement($upperNextButton);
  showElement($upperPreviousButton);
  hideElement($homepageButton);
  hideElement($errorPokemonCard);
  return loadPokemonList(POKEMON_LIST_URL);
});
