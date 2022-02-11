let nextPokemonList;
let previousPokemonList;

async function initialize() {
  const POKEMON_LIST_URL =
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
  const response = await fetch(POKEMON_LIST_URL);
  const json = await response.json();
  const { results: results } = json;
  nextPokemonList = json.next;
  previousPokemonList = json.previous;
  return results.forEach((object) => {
    loadSinglePokemon(object.url);
  });
}
async function loadPokemonList(apiURL) {
  const response = await fetch(apiURL);
  const json = await response.json();
  const { results: results } = json;
  nextPokemonList = json.next;
  previousPokemonList = json.previous;
  return results.forEach((object) => {
    loadSinglePokemon(object.url);
  });
}

async function loadSinglePokemon(pokemonURL) {
  const response = await fetch(pokemonURL);
  const json = await response.json();
  return createPokemonCard(json);
}

function createPokemonCard(pokemon) {
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

const $lowerNextButton = document.querySelector(".lower-next-button");
$lowerNextButton.addEventListener("click", () => {
  if (nextPokemonList === null) return function () {};
  deletePreviousPokemonCards();
  loadPokemonList(nextPokemonList);
});

const $upperNextButton = document.querySelector(".upper-next-button");
$upperNextButton.addEventListener("click", () => {
  if (nextPokemonList === null) return function () {};
  deletePreviousPokemonCards();
  loadPokemonList(nextPokemonList);
});

const $lowerPreviousButton = document.querySelector(".lower-previous-button");
$lowerPreviousButton.addEventListener("click", () => {
  if (previousPokemonList === null) return function () {};
  deletePreviousPokemonCards();
  loadPokemonList(previousPokemonList);
});

const $upperPreviousButton = document.querySelector(".upper-previous-button");
$upperPreviousButton.addEventListener("click", () => {
  if (previousPokemonList === null) return function () {};
  deletePreviousPokemonCards();
  loadPokemonList(previousPokemonList);
});

const $pokemonSearchButton = document.querySelector(".pokemon-search-button");
$pokemonSearchButton.addEventListener("click", (event) => {
  validateForm();
  event.preventDefault();
});

function validateForm(event) {
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

function loadSearchBarPokemon(pokemonSearchURL) {
  return fetch(pokemonSearchURL)
    .then((api_response) => {
      if (!api_response.ok)
        return "Something went wrong, please try again later.";
      return api_response.json();
    })
    .then((api_responseJSON) => {
      return createPokemonCard(api_responseJSON);
    })
    .catch((error) => {
      console.error(error);
      return createCatchCardError();
    });
}

const $homepageButton = document.querySelector(".homepage-button");
$homepageButton.addEventListener("click", (event) => {
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
  loadPokemonList(POKEMON_LIST_URL);
});

function createCatchCardError() {
  const $pokemonSearchInput = document.querySelector(".pokemon-search-input");
  const $errorPokemonCard = document.querySelector(".error-pokemon-card");
  $pokemonSearchInput.value = "";
  $pokemonSearchInput.classList.add("error");
  showElement($errorPokemonCard);
  const $errorDescription = document.querySelector(".error-description");
  $errorDescription.textContent = "That Pokemon doesn't exist. Try again.";
}

function deletePreviousPokemonCards() {
  const $pokemonCards = document.querySelectorAll(".pokemon-card");
  $pokemonCards.forEach((card) => {
    card.remove();
  });
}

function hideElement(element) {
  element.classList.add("hidden");
}

function showElement(element) {
  element.classList.remove("hidden");
}

initialize();
