/// <reference types="Cypress" />

import data from './../fixtures/data.json';

describe('Test about me', function () {
  it('should redirect to aboutme', function () {
    cy.visit('/aboutme');
    cy.url().should('contain', '/aboutme');
  });

  it('should have the correct heading', function () {
    cy.get('h1').should('have.text', 'The App: GetMyJab');
  });

  it('should have 4 external links', function () {
    cy.get('.about-block > p').then(function (elem) {
      cy.get(elem).should('have.length', 4);
      cy.get(elem)
        .eq(0)
        .children('a')
        .should('have.attr', 'href', 'https://twitter.com/anirbmuk');
      cy.get(elem)
        .eq(1)
        .children('a')
        .should('have.attr', 'href', 'https://www.linkedin.com/in/anirbmuk');
      cy.get(elem)
        .eq(2)
        .children('a')
        .should('have.attr', 'href', 'https://github.com/anirbmuk/getmyjab');
      cy.get(elem)
        .eq(3)
        .children('a')
        .should('have.attr', 'href', 'https://theangularpath.anirbanblogs.com');
    });
  });

  it('clicking on home-page link should correctly redirect to home page', function () {
    cy.visit('/aboutme');
    cy.get('[data-cy=slotsUrl]').should('have.text', 'home page');
    cy.get('[data-cy=slotsUrl]').click();
    cy.url().should('equal', data.appUrl);
  });

  it('clicking on covid link should correctly redirect to covid page', function () {
    cy.visit('/aboutme');
    cy.get('[data-cy=covidUrl]').should('have.text', 'status');
    cy.get('[data-cy=covidUrl]').click();
    cy.url().should('contain', '/covid');
  });
});
