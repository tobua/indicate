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
    const selector = '.theme-class-name'
    cy.get(selector).should('be.visible')

    getIndicator(selector, 'left').should('not.be.visible')
    getIndicator(selector, 'right').should('be.visible')

    getIndicator(selector, 'left').should('have.class', 'i-indicator-left')

    cy.get(`${selector} .i-observer-top`).should('exist')
    cy.get(`${selector} .i-arrow-bottom`)
      .should('exist')
      .should('not.be.visible')

    const outerWrapper = cy.get(`${selector}.i-outer-wrapper`)
    const element = cy.get(`${selector} .i-element`)
    const innerWrapper = cy.get(`${selector} .i-inner-wrapper`)

    outerWrapper.should('exist')
    element.should('exist')
    innerWrapper.should('exist')
  })
})
