/// <reference types="cypress" />

const URL = "http://127.0.0.1:8080";

context("Pokedex", () => {
  before(() => {
    cy.visit(URL);
  });

  describe("Layout", () => {
    it("Make sure the layout has been correctly loaded", () => {
      cy.get(".navbar").should(
        "have.css",
        "background-color",
        "rgb(247, 159, 159)"
      );
      cy.get(".navbar img").should(
        "have.attr",
        "src",
        "src/images/pokeball.svg"
      );
      cy.get(".navbar a").should("contain", "Pokedex");
      cy.get(".pokemon-search-input").should(
        "have.attr",
        "placeholder",
        "Insert Pokemon Name"
      );
      cy.get(".pokemon-search-button").should("contain", "Search");
      cy.get(".upper-transition-buttons-container button:first")
        .should("contain", "Prev")
        .and("have.css", "background-color", "rgb(82, 204, 205)")
        .and("not.be.visible");
      cy.get(".upper-transition-buttons-container button:last")
        .should("contain", "Next")
        .and("have.css", "background-color", "rgb(82, 204, 205)")
        .and("not.be.visible");
      cy.get(".lower-transition-buttons-container button:first")
        .should("contain", "Prev")
        .and("have.css", "background-color", "rgb(82, 204, 205)")
        .and("be.visible");
      cy.get(".lower-transition-buttons-container button:last")
        .should("contain", "Next")
        .and("have.css", "background-color", "rgb(82, 204, 205)")
        .and("be.visible");
      cy.get(".homepage-button")
        .should("contain", "Return to Pokedex")
        .and("have.css", "background-color", "rgb(82, 204, 205)")
        .and("not.be.visible");
      cy.get(".error-pokemon-card").should("not.be.visible");
      cy.get(".error-pokemon-card img").should(
        "have.attr",
        "src",
        "src/images/pokemon-silhouette.png"
      );
      cy.get(".error-pokemon-card h5").should("contain", "Uh-oh! Error!");
      cy.get(".error-pokemon-description li").should("have.length", "2");
      cy.get(".error-pokemon-description li:first").should(
        "contain",
        "Number: 404"
      );
      cy.get(".error-description").should("exist");
    });
  });

  describe("Make sure the functionality of the Pokedex works correctly", () => {
    it("Load up the Pokedex homepage when clicking on the logo", () => {
      cy.get(".navbar-brand").click();
      cy.url().should("include", "http://127.0.0.1:8080");
      cy.get(".pokemon-card").should("have.length", "10");
    });
    it("Make sure the next and previous buttons work correctly in mobile", () => {
      cy.viewport(375, 667);
      cy.get(".pokemon-card").should("have.length", "10");
      let firstPagePokemonNames = [];
      cy.get(".pokemon-card h5").then((pokemonCardTitle) => {
        return pokemonCardTitle.each((index, title) => {
          firstPagePokemonNames.push(title.textContent);
        });
      });
      cy.get(".upper-next-button").should("be.visible").click();
      cy.get(".pokemon-card").should("have.length", "10");
      cy.get(".pokemon-card h5")
        .first()
        .should((pokemonName) => {
          expect(firstPagePokemonNames).to.not.include(
            pokemonName[0].textContent
          );
        });
      cy.get(".upper-previous-button").should("be.visible").click();
      cy.get(".pokemon-card").should("have.length", "10");
      cy.get(".pokemon-card h5")
        .first()
        .should((pokemonName) => {
          expect(firstPagePokemonNames).to.include(pokemonName[0].textContent);
        });
      cy.get(".pokemon-card").should("have.length", "10");
      cy.get(".pokemon-card h5").then((pokemonCardTitle) => {
        return pokemonCardTitle.each((index, title) => {
          firstPagePokemonNames.push(title.textContent);
        });
      });
      cy.get(".lower-next-button").should("be.visible").click();
      cy.get(".pokemon-card").should("have.length", "10");
      cy.get(".pokemon-card h5")
        .first()
        .should((pokemonName) => {
          expect(firstPagePokemonNames).to.not.include(
            pokemonName[0].textContent
          );
        });
      cy.get(".lower-previous-button").should("be.visible").click();
      cy.get(".pokemon-card").should("have.length", "10");
      cy.get(".pokemon-card h5")
        .first()
        .should((pokemonName) => {
          expect(firstPagePokemonNames).to.include(pokemonName[0].textContent);
        });
      cy.get(".lower-previous-button").should("be.visible").click();
      cy.get(".pokemon-card").should("have.length", "10");
      cy.get(".pokemon-card h5")
        .first()
        .should((pokemonName) => {
          expect(firstPagePokemonNames).to.include(pokemonName[0].textContent);
        });
    });
    it("Make sure the next and previous buttons work correctly in large screens", () => {
      cy.visit(URL);
      cy.get(".pokemon-card").should("have.length", "10");
      cy.get(".upper-next-button").should("not.be.visible");
      cy.get(".upper-previous-button").should("not.be.visible");
      let firstPagePokemonNames = [];
      cy.get(".pokemon-card h5").then((pokemonCardTitle) => {
        return pokemonCardTitle.each((index, title) => {
          firstPagePokemonNames.push(title.textContent);
        });
      });
      cy.get(".lower-next-button").should("be.visible").click();
      cy.get(".pokemon-card").should("have.length", "10");
      cy.get(".pokemon-card h5")
        .first()
        .should((pokemonName) => {
          expect(firstPagePokemonNames).to.not.include(
            pokemonName[0].textContent
          );
        });
      cy.get(".lower-previous-button").should("be.visible").click();
      cy.get(".pokemon-card").should("have.length", "10");
      cy.get(".pokemon-card h5")
        .first()
        .should((pokemonName) => {
          expect(firstPagePokemonNames).to.include(pokemonName[0].textContent);
        });
      cy.get(".lower-previous-button").should("be.visible").click();
      cy.get(".pokemon-card").should("have.length", "10");
      cy.get(".pokemon-card h5")
        .first()
        .should((pokemonName) => {
          expect(firstPagePokemonNames).to.include(pokemonName[0].textContent);
        });
    });
  });
});
