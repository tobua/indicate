import React from 'react'
import { render } from 'react-dom'
import { Konfi, Type } from 'konfi'
import prettier from 'prettier'
// @ts-ignore
import parserBabel from 'prettier/esm/parser-babel.mjs'
import './styles.css'
import { indicate, remove, defaultOptions } from 'indicate'

// Remove the default options, so only the changes remain.
const removeDefaultOptions = (options, defaults = defaultOptions) => {
  Object.keys(options).forEach((key) => {
    if (options[key] !== null && typeof options[key] === 'object') {
      removeDefaultOptions(options[key], defaults[key])
      return
    }

    if (options[key] === defaults[key]) {
      delete options[key]
    }
  })

  return options
}

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
  const modifiedOptions = removeDefaultOptions(options)
  const stringifiedOptions = Object.keys(modifiedOptions).length
    ? `, options: ${JSON.stringify(modifiedOptions)}`
    : ''
  const currentCode = prettier.format(
    `Indicate({ element: '.demo'${stringifiedOptions} })`,
    {
      parser: 'babel',
      plugins: [parserBabel],
      semi: false,
      trailingComma: 'none',
      printWidth: 40,
    }
  )
  const code = document.getElementById('code')
  code.innerHTML = currentCode
  // Remove existing instance (when options edited).
  remove('.demo')
  // Insert tiles according to current count.
  insertTiles()
  // Initialize indicate effect with currently selected options.
  indicate({ element: '.demo', options })
}

initialize()

const data = {
  arrow: true,
  arrowPosition: 'center',
  click: true,
  color: '#FFFFFF',
  width: '20px',
}

// The schema is optional and in most cases can be inferred from the data.
const schema = {
  arrow: {
    type: Type.boolean,
  },
  arrowPosition: {
    type: Type.select,
    values: ['start', 'center', 'end'],
  },
  click: {
    type: Type.boolean,
  },
  color: {
    type: Type.hex,
  },
  width: {
    type: Type.string,
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
  <div className="edits">
    <div className="options">
      <h2>Edit Options</h2>
      <Konfi schema={schema} data={data} onChange={handleOptions} />
    </div>
    <div className="styles">
      <h2>Edit Styles</h2>
      <Konfi data={{ maxHeight: '15vw' }} onChange={handleStyles} />
    </div>
  </div>,
  document.getElementById('options')
)
