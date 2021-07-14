/// <reference types="Cypress" />

describe('Test application UI', function () {
  it('should have the correct logo', function () {
    cy.visit('');
    cy.get('.getmyjab-logo').should('have.text', 'GetMyJab');
  });

  it('should have the correct title', function () {
    cy.title().should('contain', 'GetMyJab');
  });

  it('should have 2 radio buttons', function () {
    cy.get('#mat-radio-2 > .mat-radio-label > .mat-radio-label-content').should(
      'contain.text',
      'First dose'
    );
    cy.get('#mat-radio-3 > .mat-radio-label > .mat-radio-label-content').should(
      'contain.text',
      'Second dose'
    );
  });

  it('should have 2 sets of toggle buttons', function () {
    cy.get(
      '#mat-button-toggle-2-button > .mat-button-toggle-label-content'
    ).should('contain.text', 'Age: 18+');
    cy.get(
      '#mat-button-toggle-3-button > .mat-button-toggle-label-content'
    ).should('contain.text', 'Age: 45+');
    cy.get(
      '#mat-button-toggle-4-button > .mat-button-toggle-label-content'
    ).should('contain.text', 'All');
    cy.get(
      '#mat-button-toggle-5-button > .mat-button-toggle-label-content'
    ).should('contain.text', 'Free');
    cy.get(
      '#mat-button-toggle-6-button > .mat-button-toggle-label-content'
    ).should('contain.text', 'Paid');
  });

  it('should have 3 tabs', function () {
    cy.get('.mat-tab-label').should('have.length', 3);
    cy.get('#mat-tab-label-0-0').should('have.text', 'Karnataka');
    cy.get('#mat-tab-label-0-1').should('have.text', 'Bengal');
    cy.get('#mat-tab-label-0-2').should('have.text', 'Maharashtra');
  });
});
