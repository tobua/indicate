const positionToIndex = {
  left: 1,
  right: 2,
  top: 3,
  bottom: 4,
}
const getIndicator = (element, position) =>
  cy.get(`${element} > span:nth-of-type(${positionToIndex[position]})`)

describe('Adding Bookmarks', () => {
  it('Proper indicators visible.', () => {
    cy.visit('http://localhost:3000/indicate/test')
    cy.get('.simple').should('be.visible')

    getIndicator('.simple', 'left').should('not.be.visible')
    getIndicator('.simple', 'right').should('be.visible')
    getIndicator('.simple', 'top').should('not.be.visible')
    getIndicator('.simple', 'bottom').should('not.be.visible')

    cy.get('.simple > div').should('have.prop', 'scrollLeft', 0)

    // Scroll right.
    getIndicator('.simple', 'right').click()

    cy.get('.simple > div').should('not.have.prop', 'scrollLeft', 0)

    getIndicator('.simple', 'left').should('be.visible')
    getIndicator('.simple', 'right').should('not.be.visible')
  })
  it('Changes visibility on manual scroll.', () => {
    cy.reload()
    getIndicator('.simple', 'left').should('not.be.visible')
    getIndicator('.simple', 'right').should('be.visible')
    cy.get('.simple > div').scrollTo('right')
    getIndicator('.simple', 'left').should('be.visible')
    getIndicator('.simple', 'right').should('not.be.visible')
  })
  it('No scroll on click if click disabled.', () => {
    getIndicator('.no-click', 'right').should('be.visible')
    cy.get('.no-click > div').should('have.prop', 'scrollLeft', 0)
    getIndicator('.no-click', 'right').click()
    getIndicator('.no-click', 'right').should('be.visible')
    cy.get('.no-click > div').should('have.prop', 'scrollLeft', 0)
  })
  it('No arrow inside indicator if disabled through option.', () => {
    getIndicator('.no-arrow', 'right').should('be.empty')
  })
})
