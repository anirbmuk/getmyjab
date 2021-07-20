// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getNthSession', index => {
  cy.get('app-session').eq(index);
});

Cypress.Commands.add('getStringFromDate', date => {
  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = `${date.getFullYear()}`;
  return `${day}-${month}-${year}`;
});

Cypress.Commands.add('addDays', (source, days) => {
  const target = new Date(source.valueOf());
  const date = source.getDate();
  target.setDate(date + days);
  const day = `${target.getDate()}`.padStart(2, '0');
  const month = `${target.getMonth() + 1}`.padStart(2, '0');
  const year = `${target.getFullYear()}`;
  return `${day}-${month}-${year}`;
});
