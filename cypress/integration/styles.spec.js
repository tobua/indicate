import { open, getIndicator, getIndicatorElement } from '../helper.js'

describe('Plugin works with custom styles on element.', () => {
  it('Padding.', () => {
    open()
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
