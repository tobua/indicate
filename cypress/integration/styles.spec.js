import { getIndicator, getIndicatorElement, testing } from '../helper.js'

describe('Plugin works with custom styles on element.', () => {
  it('Padding.', () => {
    cy.visit('http://localhost:3000/indicate/test')
    const selector = '.padding'
    cy.get(selector).should('be.visible')

    cy.document().then((document) => {
      const defaultRightIndicator = getIndicatorElement(
        document,
        '.simple',
        'right'
      )

      getIndicator(selector, 'right')
        .invoke('outerHeight')
        .should('be.gte', defaultRightIndicator.offsetHeight)
    })
  })
})
