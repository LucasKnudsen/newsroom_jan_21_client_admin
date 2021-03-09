describe('admin can login to create a new article', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/admin_auth/validate_token',
      response: ""
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/admin_auth/sign_in',
      response: 'fixture:sign_in.json',
      headers: {
        uid: 'user@gmail.com'
      }
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/admin/articles',
      response: 'fixture:list_of_articles.json'
    })
    cy.visit('/')
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/admin_auth/validate_token**',
      response: 'fixture:sign_in.json',
      headers: {
        uid: 'user@gmail.com'
      }
    })
    cy.get('[data-cy="registration-form"]').within(() => {
      cy.get('[data-cy="email-field"]').type('user@email.com')
      cy.get('[data-cy="password-field"]').type('password')
      cy.get('[data-cy="submit"]').click()
    })

  })
  describe('successfully', () => {
    beforeEach(() => {
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/admin/articles',
        response: {
          message: "The article was successfully created!"
        }
      })
    })

    it('displays a welcome message', () => {
      cy.get('[data-cy="welcome-message"]').should('contain', 'Welcome back Mr. Miyagi!')
    })

    it('displays a success message and closes form', () => {
      cy.get('[data-cy="create-button"]').click()
      cy.get('[data-cy="create-form"]').within(() => {
        cy.get('[data-cy="title-field"]').type('Test title')
        cy.get('[data-cy="teaser-field"]').type('Test teaser')
        cy.get('[data-cy="body-field"]').type('Test body.{enter}{enter}More test body!')
        cy.get('[data-cy="article-type-field"]').eq(1).check()
        cy.get('[data-cy="category-field"]').click()
        cy.get('[role="option"]').contains('News').click()
        cy.get('[data-cy="location-field"]').type('Frederiksdal')
        cy.get('[data-cy="submit-button"]').click()
      })
      cy.get('[data-cy="success-message"]').should('contain', 'The article was successfully created!')
      cy.get('[data-cy="create-form"]').should('not.be.visible')
    })
  })
  describe('unsuccessfully with invalid submit', () => {
    beforeEach(() => {
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/admin/articles',
        response: {
          message: "Please fill out all fields."
        },
        status: 422
      })
    })

    it('displays an error message and doesnt clear form', () => {
      cy.get('[data-cy="create-button"]').click()
      cy.get('[data-cy="create-form"]').within(() => {
        cy.get('[data-cy="teaser-field"]').type('Test teaser')
        cy.get('[data-cy="body-field"]').type('Test body.{enter}{enter}More test body!')
        cy.get('[data-cy="article-type-field"]').first().check()
        cy.get('[data-cy="category-field"]').click()
        cy.get('[role="option"]').contains('News').click()
        cy.get('[data-cy="location-field"]').type('Frederiksdal')
        cy.get('[data-cy="submit-button"]').click()
      })
      cy.get('[data-cy="form-message"]').should('contain', 'Please fill out all fields.')
      cy.get('[data-cy="create-form"]').within(() => {
        cy.get('[data-cy="teaser-field"]').should('have.value', 'Test teaser')
      })
    })
  })
})