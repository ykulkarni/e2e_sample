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
    cy.signIn({ email: 'super@secret.com', password: '1234567890' })
    // Assert you are logged in successfully
    cy.get(page_elements.text.success)
      .should('exist')
      .should('contain', messages.LOGIN_SUCCESS)
  })

  context('Login Failure', () => {
    it('When incorrect Password', () => {
      cy.signIn({ email: 'super@secret.com', password: '!234567890' })
      // Assert you get login failure - Invalid email or password
      cy.get(page_elements.text.error)
        .should('exist')
        .should('contain', messages.LOGIN_FAILED)
    })

    it('When incorrect email', () => {
      cy.signIn({ email: 'super123@secret.com', password: '1234567890' })
      // Assert you get login failure - Invalid email or password
      cy.get(page_elements.text.error)
        .should('exist')
        .should('contain', messages.LOGIN_FAILED)
    })

    it('When email Empty', () => {
      cy.signIn({ password: '!234567890' })
      // Assert you get login failure - Invalid email format
      cy.get(page_elements.text.error)
        .should('exist')
        .should('contain', messages.INVALID_EMAIL_FORMAT)
    })

    it('When password Empty', () => {
      cy.signIn({ email: 'super123@secret.com' })
      // Assert you get login failure - Must Provide a Passord
      cy.get(page_elements.text.error)
        .should('exist')
        .should('contain', messages.PASSWORD_EMPTY)
    })
  })

  it('Should take you to Register page when you click register link', () => {
    cy.get(page_elements.text.register)
      .children('a')
      .click()
    cy.url().should('include', '/register')
  })
})
