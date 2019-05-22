const page_elements = require('../fixtures/pageElements.json')
const messages = require('../fixtures/messages.json')

describe('The login page', () => {
  beforeEach(() => {
    // Navigate to login form
    cy.visit('/login')
  })

  it('Should contain the required fields', () => {
    // Assert that form elements exist
    cy.get(page_elements.inputs.email).should('exist')
    cy.get(page_elements.inputs.password).should('exist')
    cy.get(page_elements.buttons.login).should('exist')

    // Assert that the registration form is accessible
    cy.get(page_elements.text.register)
      .should('exist')
      .should('contain', "Don't have an account yet?")
  })

  it('Should login with correct Password and Email', () => {
    cy.signIn({email: 'super@secret.com', password: '1234567890'})
    cy.get(page_elements.text.success)
    .should('exist')
    .should('contain', messages.LOGIN_SUCCESS)
  })

  context('Login Failure',() => {
    it('Incorrect Password', () => {
      cy.signIn({email: 'super@secret.com', password: '!234567890'})
      cy.get(page_elements.text.error)
        .should('exist')
        .should('contain', messages.LOGIN_FAILED)
    })

    it('Incorrect email', () => {
      cy.signIn({email: 'super123@secret.com', password: '1234567890'})
      cy.get(page_elements.text.error)
        .should('exist')
        .should('contain', messages.LOGIN_FAILED)
    })

    it('Email Empty', () => {
      cy.signIn({ password: '!234567890'})
      cy.get(page_elements.text.error)
        .should('exist')
        .should('contain', messages.INVALID_EMAIL_FORMAT)
    })

    it('Password Empty', () => {
      cy.signIn({ email: 'super123@secret.com'})
      cy.get(page_elements.text.error)
        .should('exist')
        .should('contain', messages.PASSWORD_EMPTY)
      })
  })

  it('It should take you to Register page when you click register link', () => {
    cy.get(page_elements.text.register).children('a').click()
    cy.url().should('include','/register')
  })
})
