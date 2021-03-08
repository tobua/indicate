import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { autorun, runInAction } from 'mobx'
import { observer } from 'mobx-react'
import { Konfi } from 'konfi'
import { Exmpl, Code } from 'exmpl'
import './styles.css'
import { indicate, remove } from 'indicate'
import { ReactPreview } from 'react-preview'
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

const renderIndicate = () => {
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
}

const handleOptions = (data: any) =>
  runInAction(() => Object.assign(options, data))

const handleStyles = (data: any) =>
  runInAction(() => Object.assign(styles, data))

// Code preview matching current options.
const CodePreview = observer(() => (
  <Code>
    {formatCode(
      (value) => `import { indicate } from 'indicate'

indicate({ element: '.demo'${value} })`,
      (value) => `, options: ${value}`
    )}
  </Code>
))

const Body = () => {
  useEffect(() => {
    autorun(renderIndicate)
  })

  return (
    <Exmpl title="indicate Demo" npm="indicate" github="tobua/indicate">
      <div style={{ whiteSpace: 'nowrap' }} className="demo"></div>
      <div className="edits">
        <div style={{ flex: 1 }}>
          <h2>Edit Options</h2>
          <Konfi
            schema={optionsSchema}
            data={options}
            onChange={handleOptions}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Edit Styles & Contents</h2>
          <Konfi data={styles} onChange={handleStyles} />
        </div>
      </div>
      <h2>Code</h2>
      <CodePreview />
      <ReactPreview />
    </Exmpl>
  )
}

render(<Body />, document.body)
