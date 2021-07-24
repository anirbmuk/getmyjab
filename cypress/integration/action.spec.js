/// <reference types="Cypress" />

describe('Test user actions', function () {
  it('should have Karnataka as selected tab', function () {
    cy.visit('');
    cy.get('h1').should('have.text', 'Karnataka Slots');
  });

  it('should show West Bengal as h1 after selecting second tab', function () {
    cy.get('#mat-tab-label-0-1').click();
    cy.get('h1').should('have.text', 'West Bengal Slots');
  });

  it('should show Maharashtra as h1 after selecting third tab', function () {
    cy.get('#mat-tab-label-0-2').click();
    cy.get('h1').should('have.text', 'Maharashtra Slots');
  });

  it('should show Karnataka as h1 after selecting first tab', function () {
    cy.get('#mat-tab-label-0-0').click();
    cy.get('h1').should('have.text', 'Karnataka Slots');
  });

  it('should toggle the mat-button-group', function () {
    cy.get('#mat-button-toggle-6').click();
    cy.get('#mat-button-toggle-6').should(
      'have.class',
      'mat-button-toggle-checked'
    );
    cy.get('#mat-button-toggle-5').click();
    cy.get('#mat-button-toggle-5').should(
      'have.class',
      'mat-button-toggle-checked'
    );
    cy.get('#mat-button-toggle-4').click();
    cy.get('#mat-button-toggle-4').should(
      'have.class',
      'mat-button-toggle-checked'
    );
    cy.get('#mat-button-toggle-3').click();
    cy.get('#mat-button-toggle-3').should(
      'have.class',
      'mat-button-toggle-checked'
    );
    cy.get('#mat-button-toggle-2').click();
    cy.get('#mat-button-toggle-2').should(
      'have.class',
      'mat-button-toggle-checked'
    );
  });

  it('should open date modal when clicked on Second dose and reset when cancelled', function () {
    cy.get('#mat-radio-3 > .mat-radio-label > .mat-radio-container').click();
    cy.get('#mat-radio-3').should('have.class', 'mat-radio-checked');
    cy.get('[data-cy=doseModal]').should('be.visible');
    cy.get('#mat-dialog-title-0').should(
      'contain.text',
      'When did you get your first dose?'
    );
    cy.get('[data-cy=submitModal]').should('be.disabled');
    cy.get('[data-cy=cancelModal]').click();
    cy.get('[data-cy=doseModal]').should('not.exist');
    cy.get('#mat-radio-2').should('have.class', 'mat-radio-checked');
  });

  it('should set and edit second dose correctly', function () {
    cy.get('#mat-radio-3 > .mat-radio-label > .mat-radio-container').click();
    cy.get('[data-cy=doseModal]').should('be.visible');
    cy.get('[data-cy=inputDoseDate]').type('5/13/2021');
    cy.get('[data-cy=inputDoseVaccine]').click();
    cy.get('mat-option').eq(0).click();
    cy.get('[data-cy=submitModal]').should('be.enabled');
    cy.get('[data-cy=submitModal]').click();
    cy.get('[data-cy=doseModal]').should('not.exist');
    cy.get('#mat-radio-3').should('have.class', 'mat-radio-checked');
    cy.get('[data-cy=displaydate]').should('have.text', '13-05-2021');
    cy.get('[data-cy=displayvaccine]').should('have.text', 'COVISHIELD');
    cy.get('[data-cy=editDoseLink]').should('exist');

    cy.wait(500);

    cy.get('[data-cy=editDoseLink]').click();
    cy.get('[data-cy=doseModal]').should('be.visible');
    cy.get('[data-cy=inputDoseDate]').clear();
    cy.get('[data-cy=inputDoseDate]').type('4/13/2021');
    cy.get('[data-cy=inputDoseVaccine]').click();
    cy.get('mat-option').eq(1).click();
    cy.get('[data-cy=submitModal]').click();
    cy.get('[data-cy=doseModal]').should('not.exist');
    cy.get('#mat-radio-3').should('have.class', 'mat-radio-checked');
    cy.get('[data-cy=displaydate]').should('have.text', '13-04-2021');
    cy.get('[data-cy=displayvaccine]').should('have.text', 'COVAXIN');
  });
});
