/// <reference types="cypress" />

context("Site", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it("loads the page", () => {});
});
