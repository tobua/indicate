import { open, getIndicator } from '../helper.js'

describe('Basic tests.', () => {
  it('Proper indicators visible.', () => {
    open()
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
    open()
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
