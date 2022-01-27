function testValidateSearchBar() {
  console.assert(
    validateSearchBar("p1k4chu-!") ===
      "The Pokemon name has invalid characters.",
    "The function validateSearchBar did not validate if the input value had invalid characters."
  );

  console.assert(
    validateSearchBar("pikachupikachupikachupikachupikachupikachu") ===
      "The Pokemon name is too long.",
    "The function validateSearchBar did not validate if the input value was too long."
  );
}

function executeUnitaryTests() {
  testValidateSearchBar();
}

executeUnitaryTests();
