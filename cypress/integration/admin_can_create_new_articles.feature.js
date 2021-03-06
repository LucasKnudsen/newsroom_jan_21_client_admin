describe('admin can login to create a new article', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/admin_auth/sign_in',
      response: 'fixture:sign_in.json',
      headers: {
        uid: 'user@gmail.com'
      }
    })
    cy.visit('/')
  })
  describe('successfully', () => {
    beforeEach(() => {
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/articles',
        response: {
          message: "The article was successfully created!"
        }
      })
    })

    it('displays a success message', () => {
      cy.get('[data-cy="create-form"]').within(() => {
        cy.get('[data-cy="title-field"]').type('Test title')
        cy.get('[data-cy="teaser-field"]').type('Test teaser')
        cy.get('[data-cy="body-field"]').type('Test body')
        cy.get('[data-cy="article-type-field"]').first().check()
        cy.get('[data-cy="category-field"]').type('news')
        cy.get('[data-cy="location-field"]').type('Frederiksdal')
        cy.get('[data-cy="submit-button"]').click()
      })
      cy.get('[data-cy="message"]').should('contain', 'The article was successfully created!')
    })
  })
  describe('unsuccessfully with invalid submit', () => {
    beforeEach(() => {
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/articles',
        response: {
          message: "Please fill out all fields."
        }
      })
    })

    it('displays an error message', () => {
      cy.get('[data-cy="create-form"]').within(() => {
        cy.get('[data-cy="teaser-field"]').type('Test teaser')
        cy.get('[data-cy="body-field"]').type('Test body')
        cy.get('[data-cy="article-type-field"]').first().check()
        cy.get('[data-cy="category-field"]').type('news')
        cy.get('[data-cy="location-field"]').type('Frederiksdal')
        cy.get('[data-cy="submit-button"]').click()
      })
      cy.get('[data-cy="message"]').should('contain', 'Please fill out all fields.')
    })
  })
})