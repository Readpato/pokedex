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
});
