describe('admin can edit their articles', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/admin_auth/validate_token**',
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
  })
  describe('successfully edits an article', () => {
    beforeEach(() => {
      cy.route({
        method: 'PUT',
        url: 'http://localhost:3000/api/admin/articles/*',
        response: {
          message: "The article was successfully updated!"
        }
      })
    })
    it('displays a pre-filled form', () => {
      cy.get('[data-id="article-item-1"]').within(() => {
        cy.get('[data-cy="edit-button"]').click()
      })
      cy.get('[data-cy="edit-form"]').within(() => {
        cy.get('[data-cy="title-field"]').find('input').should('have.value', 'Experience Test 4')
        cy.get('[data-cy="teaser-field"]').invoke('text').should('eq', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
        cy.get('[data-cy="body-field"]').invoke('text').should('contain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui accumsan sit amet nulla facilisi. Fringilla est ullamcorper eget nulla facilisi etiam. Et tortor consequat id porta nibh venenatis cras sed felis. Arcu dui vivamus arcu felis. Vitae semper quis lectus nulla at. Neque vitae tempus quam pellentesque nec nam. Adipiscing at in tellus integer feugiat scelerisque varius morbi enim. A iaculis at erat pellentesque. Neque volutpat ac tincidunt vitae semper quis lectus nulla at.')
        cy.get('[data-cy="article-type-field"]').eq(0).should('be.checked')
        cy.get('[data-cy="category-field"]').find('[aria-atomic="true"]').should('contain', 'Trip')
        cy.get('[data-cy="location-field"]').find('input').should('have.value', 'Frederiksdal')
        cy.get('[data-cy="thumbnail"]').should('be.visible')
      })
    })

    it('successfully edits an article', () => {
      cy.get('[data-id="article-item-1"]').within(() => {
        cy.get('[data-cy="edit-button"]').click()
      })
      cy.get('[data-cy="edit-form"]').within(() => {
        cy.get('[data-cy="title-field"]').type(' & now updated')
        cy.get('[data-cy="submit-button"]').click()
      })
      cy.get('[data-cy="success-message"]').should('contain', 'The article was successfully updated!')
      cy.get('[data-cy="edit-form"]').should('not.be.visible')
    })

    it('resets article content upon modal close', () => {
      cy.get('[data-id="article-item-1"]').within(() => {
        cy.get('[data-cy="edit-button"]').click()
      })
      cy.get('[data-cy="title-field"]').find('input').clear()
      cy.get('.modals').click('topLeft')
      cy.get('[data-id="article-item-1"]').within(() => {
        cy.get('[data-cy="edit-button"]').click()
      })
      cy.get('[data-cy="edit-form"]').within(() => {
        cy.get('[data-cy="title-field"]').find('input').should('have.value', 'Experience Test 4')
      })
    })
  })
  describe('unsuccessfully with empty field', () => {
    beforeEach(() => {
      cy.route({
        method: 'PUT',
        url: 'http://localhost:3000/api/admin/articles/*',
        response: {
          message: "Don't leave a field empty."
        },
        status: 422
      })
    })

    it('displays an error message', () => {
      cy.get('[data-id="article-item-1"]').within(() => {
        cy.get('[data-cy="edit-button"]').click()
      })
      cy.get('[data-cy="teaser-field"]').clear()
      cy.get('[data-cy="submit-button"]').click()
      cy.get('[data-cy="form-message"]').should('contain', "Don't leave a field empty.")
    })
  })
})
