describe('admin can edit their articles', () => {
  describe('successfully', () => {
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

    it('displays a pre-filled form', () => {
      cy.get('[data-id="article-item-1"]').within(() => {
        cy.get('[data-cy="edit-button"]').click()
      })
      cy.get('[data-cy="edit-form"]').within(() => {
        cy.get('[data-cy="title-field"]').should('contain', 'Experience Test 4')
        cy.get('[data-cy="teaser-field"]').should('contain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
        cy.get('[data-cy="body-field"]').should('contain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui accumsan sit amet nulla facilisi. Fringilla est ullamcorper eget nulla facilisi etiam. Et tortor consequat id porta nibh venenatis cras sed felis. Arcu dui vivamus arcu felis. Vitae semper quis lectus nulla at. Neque vitae tempus quam pellentesque nec nam. Adipiscing at in tellus integer feugiat scelerisque varius morbi enim. A iaculis at erat pellentesque. Neque volutpat ac tincidunt vitae semper quis lectus nulla at.')
        cy.get('[data-cy="article-type-field"]').eq(1).should('be.checked')
        cy.get('[data-cy="category-field"]').should('have.value', 'trip')
        cy.get('[data-cy="location-field"]').should('contain', 'Frederiksdal')
        cy.get('[data-cy="thumbnail"]').should('be.visible')
      })
    })
  })
})
