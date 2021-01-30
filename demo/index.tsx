import React from 'react'
import { render } from 'react-dom'
import { Konfi, Type } from 'konfi'
import './styles.css'
import { Indicate } from 'indicate'

const insertTiles = () => {
  const element = document.querySelector('.demo')
  element.innerHTML = ''

  for (let count = 0; count < 9; count++) {
    const tile = document.createElement('p')
    tile.className = 'tile'
    element.append(tile)
  }
}

const initialize = (options = {}) => {
  const code = document.getElementById('code')
  code.innerHTML = `Indicate({ element: '.demo', options: ${JSON.stringify(
    options
  )} })`
  insertTiles()
  Indicate({ element: '.demo', options })
}

initialize()

const data = {
  arrow: true,
}

// The schema is optional and in most cases can be inferred from the data.
const schema = {
  arrow: {
    type: Type.boolean,
  },
}

const handleOptions = (data: any) => {
  initialize(data)
}

const handleStyles = (data: any) => {
  const element: HTMLElement = document.querySelector('.demo')
  element.style.maxHeight = data.maxHeight
}

render(
  <div style={{ display: 'flex' }}>
    <div style={{ flex: 1 }}>
      <h2>Edit Options</h2>
      <Konfi schema={schema} data={data} onChange={handleOptions} />
    </div>
    <div style={{ flex: 1 }}>
      <h2>Edit Styles</h2>
      <Konfi data={{ maxHeight: '15vw' }} onChange={handleStyles} />
    </div>
  </div>,
  document.getElementById('options')
)
