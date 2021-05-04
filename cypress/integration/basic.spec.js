import { open, getIndicator } from '../helper.js'

describe('Basic tests.', () => {
  it('Proper indicators visible.', () => {
    const className = '.simple'
    open()
    cy.get(className).should('be.visible')

    getIndicator(className, 'left').should('not.be.visible')
    getIndicator(className, 'right').should('be.visible')
    getIndicator(className, 'top').should('not.be.visible')
    getIndicator(className, 'bottom').should('not.be.visible')

    cy.get(className).should('have.prop', 'scrollLeft', 0)

    // Scroll right.
    getIndicator(className, 'right').click()

    cy.get(className).should('not.have.prop', 'scrollLeft', 0)

    getIndicator(className, 'left').should('be.visible')
    getIndicator(className, 'right').should('not.be.visible')
  })
  it('Changes visibility on manual scroll.', () => {
    const className = '.simple'
    open()
    getIndicator(className, 'left').should('not.be.visible')
    getIndicator(className, 'right').should('be.visible')
    cy.get(className).scrollTo('right')
    getIndicator(className, 'left').should('be.visible')
    getIndicator(className, 'right').should('not.be.visible')
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
  it('Color option colors the fade effect in rgb.', () => {
    getIndicator('.color', 'right')
      .should('have.attr', 'style')
      .should('contain', 'rgb(255, 0, 255)')
  })
  it('Arrow SVG is colored.', () => {
    getIndicator('.pointer', 'right')
      .find('svg')
      .should('have.attr', 'stroke', '#FF00FF')
  })
  it('Vertical indicators show up as well.', () => {
    const className = '.vertical'

    getIndicator(className, 'left').should('not.be.visible')
    getIndicator(className, 'right').should('be.visible')
    getIndicator(className, 'top').should('not.be.visible')
    getIndicator(className, 'bottom').should('be.visible')

    cy.get(className).scrollTo('bottomRight')

    getIndicator(className, 'left').should('be.visible')
    getIndicator(className, 'right').should('not.be.visible')
    getIndicator(className, 'top').should('be.visible')
    getIndicator(className, 'bottom').should('not.be.visible')
  })
})

describe('Observers work correctly.', () => {
  it('Proper indicators visible even if only 1 px overflow present.', () => {
    const className = '.overflow'
    open()
    cy.get(className).should('be.visible')

    getIndicator(className, 'left').should('not.be.visible')
    getIndicator(className, 'right').should('be.visible')
    getIndicator(className, 'top').should('not.be.visible')
    getIndicator(className, 'bottom').should('be.visible')

    getIndicator(className, 'right').click()
    getIndicator(className, 'bottom').click()

    getIndicator(className, 'left').should('be.visible')
    getIndicator(className, 'right').should('not.be.visible')
    getIndicator(className, 'top').should('be.visible')
    getIndicator(className, 'bottom').should('not.be.visible')
  })
})
