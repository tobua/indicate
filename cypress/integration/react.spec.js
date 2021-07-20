import { open, getIndicator, noIndicators } from '../helper.js'

describe('Basic tests for table elements', () => {
  it('Regular react version works.', () => {
    const className = '.react-regular'
    open()
    cy.get(className).should('be.visible')

    // Verify basic functionality also works with react.
    getIndicator(className, 'left').should('not.be.visible')
    getIndicator(className, 'right').should('be.visible')

    // Parent as it's an inline element.
    cy.get(className).should('have.prop', 'scrollLeft', 0)

    // Scroll right.
    getIndicator(className, 'right').click()

    cy.get(className).should('not.have.prop', 'scrollLeft', 0)

    getIndicator(className, 'left').should('be.visible')
    getIndicator(className, 'right').should('be.visible')
  })
  it('React with childAsElement works.', () => {
    const className = '.react-child'
    open()
    cy.get(className).should('be.visible')

    getIndicator(className, 'left').should('not.be.visible')
    getIndicator(className, 'right').should('be.visible')
  })
})

describe('Preserves layout with server-side rendering.', () => {
  it('Server-side regular react version works.', () => {
    const className = '.react-server-regular'
    open()
    cy.get(className).should('be.visible')

    // Indicators are be layout preserving and will only be added on the client.
    noIndicators(className)

    // Tiles layout kept horizontal.
    cy.get(className).invoke('height').should('be.lt', 300)
  })
  it('childAsElement works on the server.', () => {
    const className = '.react-server-child'
    open()
    cy.get(className).should('be.visible')

    noIndicators(className)

    cy.get(className).invoke('height').should('be.lt', 300)
  })
})
