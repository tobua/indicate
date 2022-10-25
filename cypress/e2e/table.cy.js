import { open, getIndicator } from '../helper.js'

describe('Basic tests for table elements', () => {
  it('Click also works with tables.', () => {
    const className = '.table'
    open()
    cy.get(className).should('be.visible')

    getIndicator(className, 'left', true).should('not.be.visible')
    getIndicator(className, 'right', true).should('be.visible')

    // Parent as it's an inline element.
    cy.get(className).parent().should('have.prop', 'scrollLeft', 0)

    // Scroll right.
    getIndicator(className, 'right', true).click()

    cy.get(className).parent().should('not.have.prop', 'scrollLeft', 0)

    getIndicator(className, 'left', true).should('be.visible')
    getIndicator(className, 'right', true).should('be.visible')

    // Requires multiple clicks to get to the end.
    getIndicator(className, 'right', true).click()

    getIndicator(className, 'left', true).should('be.visible')
    getIndicator(className, 'right', true).should('not.be.visible')
  })
})

describe('Tests for inline elements', () => {
  it('Plugin works on inline elements and keeps the page flow.', () => {
    const className = '.inline'
    open()
    cy.get(className).should('be.visible')

    // Inline elements on the same line.
    cy.get(className)
      .should('have.length', 2)
      .then(($list) => {
        expect($list[0].offsetTop).to.equal($list[1].offsetTop)
      })
  })

  it('Vertical scrolling works with inline elements.', () => {
    const className = '.inline-vertical'
    open()
    cy.get(className).should('be.visible')

    getIndicator(className, 'left').should('not.be.visible')
    getIndicator(className, 'right').should('be.visible')
    getIndicator(className, 'top').should('not.be.visible')
    getIndicator(className, 'bottom').should('be.visible')
  })
})
