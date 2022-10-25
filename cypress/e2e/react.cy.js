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
  it('React plugin works with tables.', () => {
    const className = '.react-table'
    open()
    cy.get(className).should('be.visible')

    getIndicator(className, 'left', true).should('not.be.visible')
    getIndicator(className, 'right', true).should('be.visible')
  })
  it('React with childAsElement works.', () => {
    const className = '.react-child'
    open()
    cy.get(className).should('be.visible')

    getIndicator(className, 'left').should('not.be.visible')
    getIndicator(className, 'right').should('be.visible')
  })
  it('React with childAsElement and inlineStyles works.', () => {
    const className = '.react-child-styles'
    open()
    cy.get(className).should('be.visible')

    // outerWrapper
    cy.get(className).parent().should('have.css', 'background-color', 'rgb(255, 0, 0)')
    // element
    cy.get(className).should('have.css', 'background-color', 'rgb(0, 128, 0)')
    // element from style={}
    cy.get(className).should('have.css', 'color', 'rgb(255, 255, 0)')

    // TODO innerWrapper styles for some reason moved to outerWrapper during init.
    // cy.get(className).parent().should('not.have.css', 'display', 'inline-flex')
  })
})

describe('Preserves layout with server-side rendering.', () => {
  it('Server-side regular react version works.', () => {
    const className = '.react-server-regular'
    open()
    cy.get(className).should('be.visible')

    // Initial default indicators are already rendered on the server.
    getIndicator(className, 'right').should('be.visible')
    getIndicator(className, 'bottom').should('be.visible')

    // Tiles layout kept horizontal.
    cy.get(className).invoke('height').should('be.lt', 300)
  })
  it('Horizontal only works on the server.', () => {
    const className = '.react-server-horizontal'
    open()
    cy.get(className).should('be.visible')

    getIndicator(className, 'right').should('be.visible')
    getIndicator(className, 'bottom').should('not.be.visible')

    cy.get(className).invoke('height').should('be.lt', 300)
  })
  it('Table works when rendering on the server.', () => {
    const className = '.react-server-table'
    open()
    cy.get(className).should('be.visible')

    getIndicator(className, 'right').should('be.visible')
    getIndicator(className, 'bottom').should('be.visible')

    cy.get(className).invoke('height').should('be.lt', 300)
  })
  it('childAsElement works on the server.', () => {
    const className = '.react-server-child'
    open()
    cy.get(className).should('be.visible')

    getIndicator(className, 'right').should('be.visible')
    getIndicator(className, 'bottom').should('be.visible')

    cy.get(className).invoke('height').should('be.lt', 300)
  })
  it('Applies inline styles added.', () => {
    const className = '.react-server-regular-styles'
    open()
    cy.get(className).should('be.visible')

    // outerWrapper
    cy.get(className).parent().should('have.css', 'background-color', 'rgb(255, 0, 0)')
    // element
    cy.get(className).should('have.css', 'background-color', 'rgb(0, 128, 0)')
    // element from style={}
    cy.get(className).should('have.css', 'color', 'rgb(255, 255, 0)')
    // innerWrapper
    cy.get(className).children().first().should('have.css', 'background-color', 'rgb(0, 0, 255)')
  })
  it('Applies inline styles added.', () => {
    const className = '.react-server-regular-child-styles'
    open()
    cy.get(className).should('be.visible')

    // outerWrapper
    cy.get(className).parent().should('have.css', 'background-color', 'rgb(255, 0, 0)')
    // element
    cy.get(className).should('have.css', 'background-color', 'rgb(0, 128, 0)')
    // element from style={}
    cy.get(className).should('have.css', 'color', 'rgb(255, 255, 0)')
    // innerWrapper will be added by plugin.
  })
})
