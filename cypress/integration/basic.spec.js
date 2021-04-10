describe('Adding Bookmarks', () => {
  it('Proper indicators visible.', () => {
    cy.visit('http://localhost:3000/indicate/test')
    cy.get('.simple').should('be.visible')
  })
})
