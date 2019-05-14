const page_elements = {
  inputs: {
    email: '[data-cy="input-email"]',
    password: '[data-cy="input-password"]'
  },
  buttons: {
    login: '[data-cy="button-login"]'
  },
  text: {
    register: '[data-cy="text-register"]'
  }
}

describe('The login page', () => {
  it('Should contain the required fields', () => {
    // Navigate to login form
    cy.visit('/login')

    // Assert that form elements exist
    cy.get(page_elements.inputs.email).should('exist')
    cy.get(page_elements.inputs.password).should('exist')
    cy.get(page_elements.buttons.login).should('exist')

    // Assert that the registration form is accessible
    cy.get(page_elements.text.register)
      .should('exist')
      .should('contain', "Don't have an account yet?")
  })
})
