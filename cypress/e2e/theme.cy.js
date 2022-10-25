import { open, getIndicator } from '../helper.js'

describe('YouTube theme', () => {
  it('Proper parts visible.', () => {
    open()
    const selector = '.theme-youtube'
    cy.get(selector).should('be.visible')

    getIndicator(selector, 'left').should('not.be.visible')
    getIndicator(selector, 'right').should('be.visible')
  })
})

describe('Class-Name theme', () => {
  it('Classes added to elements.', () => {
    open()
    const className = '.theme-class-name'

    cy.get(className).should('be.visible')

    getIndicator(className, 'left').should('not.be.visible')
    getIndicator(className, 'right').should('be.visible')

    getIndicator(className, 'left').should('have.class', 'i-indicator-left')

    cy.get(`${className} .i-observer-top`).should('exist')
    cy.get(className)
      .parent()
      .get('.i-arrow-bottom')
      .should('exist')
      .should('not.be.visible')

    const outerWrapper = cy.get(className).parent().get('.i-outer-wrapper')
    const element = cy.get(`${className}.i-element`)
    const innerWrapper = cy.get(`${className} .i-inner-wrapper`)

    outerWrapper.should('exist')
    element.should('exist')
    innerWrapper.should('exist')
  })
})
