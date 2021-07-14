/// <reference types="Cypress" />

import data from './../fixtures/data.json';

describe('Test routing', function () {
  it('should redirect to notfound', function () {
    cy.visit('/schedule');
    cy.url().should('contain', '/notfound');
  });

  it('clicking on home-page link should correctly redirect to home page', function () {
    cy.get('[data-cy=slotsUrl]').should('have.text', 'home page');
    cy.get('[data-cy=slotsUrl]').click();
    cy.url().should('equal', data.appUrl);
  });

  it('clicking on status link should correctly redirect to covid page', function () {
    cy.visit('/schedule');
    cy.get('[data-cy=covidUrl]').should('have.text', 'status');
    cy.get('[data-cy=covidUrl]').click();
    cy.url().should('contain', '/covid');
  });
});
