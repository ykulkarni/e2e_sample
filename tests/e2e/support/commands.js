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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
const page_elements = require('../fixtures/pageElements.json')


Cypress.Commands.add('signIn', ({ email, password }) => {
  if(email) cy.get(page_elements.inputs.email).type(email);
  if(password) cy.get(page_elements.inputs.password).type(password);
  cy.get(page_elements.buttons.login).click();
});

Cypress.Commands.add('register', ({ fullname, email, password, confirmPassword }) => {
  if(fullname) cy.get(page_elements.inputs.name).type(fullname);
  if(email) cy.get(page_elements.inputs.email).type(email);
  if(password) cy.get(page_elements.inputs.password).type(password);
  if(confirmPassword) cy.get(page_elements.inputs.passwordConfirmation).type(confirmPassword);
  cy.get(page_elements.buttons.register).click();
});
