/* eslint-env cypress */

const positionToIndex = {
  left: 1,
  right: 2,
  top: 3,
  bottom: 4,
}

export const getIndicator = (selector, position) =>
  cy.get(`${selector} > span:nth-of-type(${positionToIndex[position]})`)

export const getIndicatorElement = (document, selector, position) =>
  document.querySelector(
    `${selector} > span:nth-of-type(${positionToIndex[position]})`
  )

export const open = () => {
  cy.visit('http://localhost:3000/indicate')
  // Navigate to test cases.
  cy.contains('Test Cases').click()
}
