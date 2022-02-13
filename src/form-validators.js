import { loadSearchBarPokemon } from "./service.js";
import { hideElement, showElement, deletePreviousPokemonCards } from "./ui.js";

export function validateForm(event) {
  const $pokemonSearchInput = document.querySelector(".pokemon-search-input");
  const $upperNextButton = document.querySelector(".upper-next-button");
  const $upperPreviousButton = document.querySelector(".upper-previous-button");
  const $lowerNextButton = document.querySelector(".lower-next-button");
  const $lowerPreviousButton = document.querySelector(".lower-previous-button");
  const $homepageButton = document.querySelector(".homepage-button");
  const POKEMON_SEARCH_URL = "https://pokeapi.co/api/v2/pokemon/";
  let pokemonName = $pokemonSearchInput.value.toLowerCase();

  const errors = {
    "search-bar-input": validateSearchBar(pokemonName),
  };

  const success = handleErrors(errors) === 0;

  if (success) {
    deletePreviousPokemonCards();
    hideElement($lowerNextButton);
    hideElement($lowerPreviousButton);
    hideElement($upperNextButton);
    hideElement($upperPreviousButton);
    showElement($homepageButton);
    loadSearchBarPokemon(`${POKEMON_SEARCH_URL}${pokemonName}`);
  }
}

function validateSearchBar(pokemon) {
  const regEx = /^[a-z]+$/i;
  const regEx2 = /^[a-z]+-[a-z]+$/i;
  const regEx3 = /^[a-z]+-[a-z]+-[a-z]+$/i;

  if (!regEx.test(pokemon)) {
    if (!regEx2.test(pokemon)) {
      if (!regEx3.test(pokemon)) {
        return "The Pokemon name has invalid characters.";
      }
    }
  }
  if (pokemon.length >= 30) return "The Pokemon name is too long.";

  return "";
}

function handleErrors(errors) {
  const $form = document.querySelector("form");
  const $errorPokemonCard = document.querySelector(".error-pokemon-card");
  const $upperNextButton = document.querySelector(".upper-next-button");
  const $upperPreviousButton = document.querySelector(".upper-previous-button");
  const $lowerNextButton = document.querySelector(".lower-next-button");
  const $lowerPreviousButton = document.querySelector(".lower-previous-button");
  const $homepageButton = document.querySelector(".homepage-button");
  const error = errors;
  const keys = Object.keys(errors);
  let errorQuantity = 0;

  keys.forEach(function (key) {
    if (error[key]) {
      $form[key].classList.add("error");
      $form[key].value = "";

      const $errorDescription = document.querySelector(".error-description");
      $errorDescription.textContent = error[key];
      deletePreviousPokemonCards();
      hideElement($lowerPreviousButton);
      hideElement($lowerNextButton);
      hideElement($upperPreviousButton);
      hideElement($upperNextButton);
      showElement($homepageButton);
      showElement($errorPokemonCard);
      errorQuantity++;
    } else {
      $form[key].classList.remove("error");
      hideElement($errorPokemonCard);
    }
  });
  return errorQuantity;
}
