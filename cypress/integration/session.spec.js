/// <reference types="Cypress" />

import './../support';
import data from './../fixtures/data.json';

describe('Test vaccination sessions', function () {
  it('correctly display the sessions without fees', function () {
    cy.getStringFromDate(new Date()).then(function (date) {
      cy.intercept('GET', `${data.baseUrl}${date}`, {
        body: data.withoutFeesBody
      }).as('dataWithoutFees');
      cy.visit('/');
      cy.getNthSession(0)
        .get('.result-header')
        .first()
        .should('contain.text', 'SESSION WITHOUT FEES');
      cy.getNthSession(0)
        .get('[data-cy=pincode]')
        .should('contain.text', '123456');
      cy.getNthSession(0)
        .get('[data-cy=feetype]')
        .should('contain.text', 'Free');
      cy.getNthSession(0).get('[data-cy=dose]').should('contain.text', '1');
      cy.getNthSession(0)
        .get('[data-cy=date]')
        .eq(0)
        .should('contain.text', '07-06-2021');
      cy.getNthSession(0).find('[data-cy=fee]').should('not.exist');
    });
  });
  it('correctly display the sessions with fees', function () {
    cy.getStringFromDate(new Date()).then(function (date) {
      cy.intercept('GET', `${data.baseUrl}${date}`, {
        body: []
      }).as('dataWithoutFees');
    });
    cy.addDays(new Date(), 7).then(function (date) {
      cy.intercept('GET', `${data.baseUrl}${date}`, {
        body: data.withFeesBody
      }).as('dataWithFees');
      cy.visit('/');
      cy.get('#mat-button-toggle-5-button').click();
      cy.getNthSession(0)
        .get('.result-header')
        .first()
        .should('contain.text', 'SESSION WITH FEES');
      cy.contains('Fee: Paid');
      cy.getNthSession(0)
        .get('[data-cy=pincode]')
        .should('contain.text', '654321');
      cy.getNthSession(0)
        .get('[data-cy=feetype]')
        .should('contain.text', 'Paid');
      cy.getNthSession(0).get('[data-cy=dose]').should('contain.text', '1');
      cy.getNthSession(0)
        .get('[data-cy=date]')
        .eq(0)
        .should('contain.text', '14-06-2021');
      cy.getNthSession(0)
        .get('[data-cy=date]')
        .eq(1)
        .should('contain.text', '14-06-2021');
      cy.getNthSession(0)
        .get('[data-cy=fee]')
        .eq(0)
        .should('contain.text', '850');
      cy.getNthSession(0)
        .get('[data-cy=fee]')
        .eq(1)
        .should('contain.text', '1,050');
    });
  });
  it('correctly toggle the fees filters', function () {
    cy.getStringFromDate(new Date()).then(function (date) {
      cy.intercept('GET', `${data.baseUrl}${date}`, {
        body: data.withoutFeesBody
      }).as('dataWithoutFees');
    });
    cy.addDays(new Date(), 7).then(function (date) {
      cy.intercept('GET', `${data.baseUrl}${date}`, {
        body: data.withFeesBody
      }).as('dataWithFees');
      cy.visit('/');
      cy.log('Testing with fee_type All');
      cy.getNthSession(0)
        .find('.result-header')
        .first()
        .should('contain.text', 'SESSION WITHOUT FEES');
      cy.getNthSession(0)
        .find('[data-cy=pincode]')
        .should('contain.text', '123456');
      cy.getNthSession(0)
        .find('[data-cy=feetype]')
        .should('contain.text', 'Free');
      cy.getNthSession(0).find('[data-cy=dose]').should('contain.text', '1');
      cy.getNthSession(0)
        .find('[data-cy=date]')
        .eq(0)
        .should('contain.text', '07-06-2021');
      cy.getNthSession(0).find('[data-cy=fee]').should('not.exist');
      cy.getNthSession(1)
        .find('.result-header')
        .first()
        .should('contain.text', 'SESSION WITH FEES');
      cy.getNthSession(1)
        .find('[data-cy=pincode]')
        .should('contain.text', '654321');
      cy.getNthSession(1)
        .find('[data-cy=feetype]')
        .should('contain.text', 'Paid');
      cy.getNthSession(1).find('[data-cy=dose]').should('contain.text', '1');
      cy.getNthSession(1)
        .find('[data-cy=date]')
        .eq(0)
        .should('contain.text', '14-06-2021');
      cy.getNthSession(1)
        .find('[data-cy=date]')
        .eq(1)
        .should('contain.text', '14-06-2021');
      cy.getNthSession(1)
        .find('[data-cy=fee]')
        .eq(0)
        .should('contain.text', '850');
      cy.getNthSession(1)
        .find('[data-cy=fee]')
        .eq(1)
        .should('contain.text', '1,050');

      cy.log('Testing with fee_type Paid');
      cy.get('#mat-button-toggle-5-button').click();
      cy.getNthSession(0)
        .find('.result-header')
        .first()
        .should('contain.text', 'SESSION WITH FEES');
      cy.getNthSession(0)
        .find('[data-cy=pincode]')
        .should('contain.text', '654321');
      cy.getNthSession(0)
        .find('[data-cy=feetype]')
        .should('contain.text', 'Paid');
      cy.getNthSession(0).find('[data-cy=dose]').should('contain.text', '1');
      cy.getNthSession(0)
        .find('[data-cy=date]')
        .eq(0)
        .should('contain.text', '14-06-2021');
      cy.getNthSession(0)
        .find('[data-cy=date]')
        .eq(1)
        .should('contain.text', '14-06-2021');
      cy.getNthSession(0)
        .find('[data-cy=fee]')
        .eq(0)
        .should('contain.text', '850');
      cy.getNthSession(0)
        .find('[data-cy=fee]')
        .eq(1)
        .should('contain.text', '1,050');

      cy.log('Testing with fee_type Free');
      cy.get('#mat-button-toggle-6-button').click();
      cy.getNthSession(0)
        .find('.result-header')
        .first()
        .should('contain.text', 'SESSION WITHOUT FEES');
      cy.getNthSession(0)
        .find('[data-cy=pincode]')
        .should('contain.text', '123456');
      cy.getNthSession(0)
        .find('[data-cy=feetype]')
        .should('contain.text', 'Free');
      cy.getNthSession(0).find('[data-cy=dose]').should('contain.text', '1');
      cy.getNthSession(0)
        .find('[data-cy=date]')
        .eq(0)
        .should('contain.text', '07-06-2021');
      cy.getNthSession(0).find('[data-cy=fee]').should('not.exist');
    });
  });
});

describe('Test second dose', function () {
  it('correctly display the second dose', function () {
    cy.getStringFromDate(new Date()).then(function (date) {
      cy.intercept('GET', `${data.baseUrl}${date}`, {
        body: data.seconddose
      });
      cy.visit('/');
      cy.get('#mat-radio-3 > .mat-radio-label > .mat-radio-container').click();
      cy.get('[data-cy=doseModal]').should('be.visible');
      cy.get('[data-cy=inputDoseDate]').type('2/1/2021');
      cy.get('[data-cy=inputDoseVaccine]').click();
      cy.get('mat-option').eq(0).click();
      cy.get('[data-cy=submitModal]').should('be.enabled');
      cy.get('[data-cy=submitModal]').click();
      cy.getNthSession(0)
        .find('.result-header')
        .first()
        .should('have.text', 'SECOND DOSE');
      cy.getNthSession(0)
        .find('[data-cy=pincode]')
        .should('contain.text', '987654');
      cy.getNthSession(0)
        .find('[data-cy=feetype]')
        .should('contain.text', 'Free');
      cy.getNthSession(0).find('[data-cy=dose]').should('contain.text', '1');
      cy.getNthSession(0)
        .find('[data-cy=vaccine]')
        .should('contain.text', 'COVISHIELD');
      cy.getNthSession(0)
        .find('[data-cy=date]')
        .eq(0)
        .should('contain.text', '14-06-2021');
      cy.getNthSession(0).find('[data-cy=fee]').should('not.exist');

      cy.wait(500);

      cy.get('[data-cy=editDoseLink]').click();
      cy.get('[data-cy=doseModal]').should('be.visible');
      cy.get('[data-cy=inputDoseVaccine]').click();
      cy.get('mat-option').eq(1).click();
      cy.get('[data-cy=submitModal]').should('be.enabled');
      cy.get('[data-cy=submitModal]').click();
      cy.getNthSession(0)
        .find('.result-header')
        .first()
        .should('have.text', 'SECOND DOSE');
      cy.getNthSession(0)
        .find('[data-cy=pincode]')
        .should('contain.text', '987654');
      cy.getNthSession(0)
        .find('[data-cy=feetype]')
        .should('contain.text', 'Free');
      cy.getNthSession(0).find('[data-cy=dose]').should('contain.text', '2');
      cy.getNthSession(0)
        .find('[data-cy=vaccine]')
        .should('contain.text', 'COVAXIN');
      cy.getNthSession(0)
        .find('[data-cy=date]')
        .eq(0)
        .should('contain.text', '14-06-2021');
      cy.getNthSession(0).find('[data-cy=fee]').should('not.exist');
    });
  });
});
