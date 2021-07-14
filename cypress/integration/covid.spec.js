/// <reference types="Cypress" />

import data from './../fixtures/data.json';

describe('Test covid-19 data', function () {
  beforeEach(function () {
    cy.intercept(data.covid19Url).as('covid19data');
    cy.visit('/covid');
    cy.wait('@covid19data');
  });

  it('should redirect to covid-19 page', function () {
    cy.url().should('contain', '/covid');
  });

  it('should have the correct heading', function () {
    cy.get('h1').should('have.text', 'Current status of COVID-19 in India');
  });

  it('should filter data correctly', function () {
    cy.get('[data-cy=stateFilter').type('West Bengal');
    cy.get('.mat-row').should('have.length', 1);
  });
});
