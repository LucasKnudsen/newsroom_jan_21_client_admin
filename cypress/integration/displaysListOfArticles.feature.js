describe('displays all of admins articles', () => {
  describe('successfully', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'GET',
        url: 'http://localhost:3000/api/admin_auth/validate_token',
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

    it('Displays a list of 3 articles', () => {
      cy.get('[data-cy="dashboard-wrapper"]')
        .find('[data-cy="article-item"]').should('have.length', 6)
    })

    it('The list shows expected content', () => {
      cy.get('[data-cy="dashboard-wrapper"]').within(() => {
        cy.get('[data-id="article-item-1"]').within(() => {
          cy.get('[data-cy="title"]').should('contain', 'Experience Test 4')
          cy.get('[data-cy="updated"]').should('contain', 'Last updated: 2021-03-09')
        })
      })
    })
  })
  describe('unsuccessfully with no belonging articles', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'GET',
        url: 'http://localhost:3000/api/admin_auth/validate_token',
        response: 'fixture:sign_in.json',
        headers: {
          uid: 'user@gmail.com'
        }
      })
      cy.route({
        method: 'GET',
        url: 'http://localhost:3000/api/admin/articles',
        response: {
          message: "You haven't written any articles yet.."
        }
      })
      cy.visit('/')
    })

    it('Displays a message', () => {
      cy.get('[data-cy="dashboard-wrapper"]')
        .find('[data-cy="message"]').should('contain', "You haven't written any articles yet..")
    })
  })
})