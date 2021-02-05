import React from 'react'
import { render } from 'react-dom'
import { autorun, runInAction } from 'mobx'
import { Konfi } from 'konfi'
import './styles.css'
import { indicate, remove } from 'indicate'
import 'react-preview'
import { formatCode } from 'code'
import { options, styles, optionsSchema } from 'state'

// https://stackoverflow.com/a/30452949/3185545 if index required.
const times = (count: number) => (callback: () => void) => {
  if (count > 0) {
    callback()
    times(count - 1)(callback)
  }
}

const createTiles = (element: Element, count: number) =>
  times(count)(() => {
    const tile = document.createElement('p')
    tile.className = 'tile'
    element.append(tile)
  })

autorun(() => {
  // Remove existing instance.
  remove('.demo')

  const element: HTMLElement = document.querySelector('.demo')
  element.innerHTML = ''

  // Adapt styles.
  element.style.maxHeight = styles.maxHeight

  // Adapt contents.
  if (styles.rows < 2) {
    createTiles(element, styles.tiles)
  } else {
    times(styles.rows)(() => {
      const wrapper = document.createElement('div')
      createTiles(wrapper, styles.tiles)
      element.append(wrapper)
    })
  }

  // Initialize indicate effect with currently selected options.
  indicate({ element: '.demo', options })
})

autorun(() => {
  // Adapt code preview to match new options.
  const currentCode = formatCode(
    (value) => `import { indicate } from 'indicate'

indicate({ element: '.demo'${value} })`,
    (value) => `, options: ${value}`
  )
  const code = document.getElementById('code-regular')
  code.innerHTML = currentCode
  // Remove existing instance (when options edited).
  remove('.demo')
  // Initialize indicate effect with currently selected options.
  indicate({ element: '.demo', options })
})

const handleOptions = (data: any) =>
  runInAction(() => Object.assign(options, data))

const handleStyles = (data: any) =>
  runInAction(() => Object.assign(styles, data))

render(
  <div className="edits">
    <div className="options">
      <h2>Edit Options</h2>
      <Konfi schema={optionsSchema} data={options} onChange={handleOptions} />
    </div>
    <div className="styles">
      <h2>Edit Styles & Contents</h2>
      <Konfi data={styles} onChange={handleStyles} />
    </div>
  </div>,
  document.getElementById('options')
)
