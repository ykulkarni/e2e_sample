// https://docs.cypress.io/api/introduction/api.html

const page_elements = require('../fixtures/pageElements.json')
const messages = require('../fixtures/messages.json')

describe('The registration page', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('Should contain the required fields', () => {
    // Assert that form elements exist
    cy.get(page_elements.inputs.email).should('exist')
    cy.get(page_elements.inputs.password).should('exist')
    cy.get(page_elements.inputs.passwordConfirmation).should('exist')
    cy.get(page_elements.buttons.register).should('exist')

    // Assert that the login link is accessible
    cy.get(page_elements.text.login)
      .should('exist')
      .should('contain', 'Already have an account?')
  })

  context('Full Name Validation', () => {
    it('Full Name field can not be empty', () => {
      cy.register({
        email: 'john.doe@live.com',
        password: 'qwerty123',
        confirmPassword: 'asdfgh123'
      })
      // Assert that error is displayed - Full name is required
      cy.get(page_elements.text.error)
        .should('exist')
        .should('contain', messages.FULL_NAME_NOT_EMPTY)
    })

    // This tests fails as it registers users with fullname = "    "
    it.skip('FAILURE: Full Name can not be string with spaces', () => {
      cy.register({
        fullname: '   ',
        email: 'john.doe@live.com',
        password: 'qwerty123',
        confirmPassword: 'qwerty123'
      })
      // Assert that error is displayed - Full name is required
      cy.get(page_elements.text.error)
        .should('exist')
        .should('contain', messages.FULL_NAME_NOT_EMPTY)
    })
  })

  context('Password Validation', () => {
    it('Passwords should match', () => {
      cy.register({
        fullname: 'John Doe',
        email: 'john.doe@live.com',
        password: 'qwerty123',
        confirmPassword: 'asdfgh123'
      })
      // Assert that error is displayed - Password confirmation does not match password
      cy.get(page_elements.text.error)
        .should('exist')
        .should('contain', messages.PASSWORD_DONT_MATCH)
    })

    it('Passwords length should be greater than 8 characters', () => {
      cy.register({
        fullname: 'John Doe',
        email: 'john.doe@live.com',
        password: 'qwerty1',
        confirmPassword: 'qwerty1'
      })
      // Assert that error is displayed - Password must be greater than 8 characters
      cy.get(page_elements.text.error)
        .should('exist')
        .should('contain', messages.PASSWORD_LENGTH)
    })

    context('Passwords', () => {
      // run the same test against different data sets
      const passwords = require('../fixtures/passwords.json')

      //Although password validation is not looking at any rules besides 8 character length, try
      // passwords with different characters
      passwords.forEach(password => {
        it(`Password format ${password}`, () => {
          cy.register({
            fullname: 'John Doe',
            email: 'john.doe@live.com',
            password: password,
            confirmPassword: password
          })
          // Asset Registration is successful with success message
          cy.get(page_elements.text.success)
            .should('exist')
            .should('contain', messages.REGISTER_SUCCESS)
        })
      })
    })
  })

  it('Registration should be successful and validate the message', () => {
    cy.register({
      fullname: 'John Doe',
      email: 'john.doe@live.com',
      password: 'qwerty123',
      confirmPassword: 'qwerty123'
    })
    // Asset Registration is successful with success message
    cy.get(page_elements.text.success)
      .should('exist')
      .should('contain', messages.REGISTER_SUCCESS)
  })

  it('It should take you to login page when you click login link', () => {
    cy.get(page_elements.text.login)
      .children('a')
      .click()
    cy.url().should('include', '/login')
  })

  context('Email validation', () => {
    // run the same test against different data sets
    const emails = require('../fixtures/emails.json')

    emails.forEach(email => {
      it(`Email format ${email}`, () => {
        cy.register({ fullname: 'John Doe', email: email })
        // Assert that error is displayed - Invalid email format
        cy.get(page_elements.text.error)
          .should('exist')
          .should('contain', messages.INVALID_EMAIL_FORMAT)
      })
    })
  })
})
