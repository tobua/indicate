/* eslint-env cypress */

const positionToIndex = {
  left: 1,
  right: 2,
  top: 3,
  bottom: 4,
}

export const getIndicator = (className, position, inline = false) => {
  let wrapper = cy.get(className).parent()

  if (inline) {
    wrapper = wrapper.parent()
  }

  return wrapper.find(`span`).eq(positionToIndex[position] + 3)
}

export const getIndicatorElement = (document, selector, position) =>
  document.querySelector(
    `${selector} ~ span:nth-of-type(${positionToIndex[position]})`
  )

export const open = () => {
  cy.visit('http://localhost:3000/indicate')
  // Navigate to test cases.
  cy.contains('Test Cases').click()
}
