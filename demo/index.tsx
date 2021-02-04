import React from 'react'
import { render } from 'react-dom'
import { observable, autorun, runInAction } from 'mobx'
import { observer } from 'mobx-react'
import { Konfi, Type } from 'konfi'
import prettier from 'prettier'
// @ts-ignore
import parserBabel from 'prettier/esm/parser-babel.mjs'
import './styles.css'
import { indicate, remove, useIndicate, defaultOptions } from 'indicate'

const options = observable({
  arrow: true,
  arrowPosition: 'center' as 'center',
  click: true,
  color: '#FFFFFF',
  width: '20px',
})

const styles = observable({
  maxHeight: '15vw',
  tiles: 9,
  rows: 1,
})

const formatCode = (
  code: (value: string) => string,
  wrapper?: (value: string) => string
) => {
  const modifiedOptions = removeDefaultOptions(options)
  const hasProperties = !!Object.keys(modifiedOptions).length
  let stringifiedOptions = hasProperties ? JSON.stringify(modifiedOptions) : ''

  // Optional wrapper only applied if there are options.
  if (wrapper && hasProperties) {
    stringifiedOptions = wrapper(stringifiedOptions)
  }

  return prettier.format(code(stringifiedOptions), {
    parser: 'babel',
    plugins: [parserBabel],
    semi: false,
    trailingComma: 'none',
    printWidth: 40,
  })
}

// Remove the default options, so only the changes remain.
const removeDefaultOptions = (options, defaults = defaultOptions) => {
  const withoutDefaults = { ...options }

  Object.keys(withoutDefaults).forEach((key) => {
    if (
      withoutDefaults[key] !== null &&
      typeof withoutDefaults[key] === 'object'
    ) {
      withoutDefaults[key] = removeDefaultOptions(
        withoutDefaults[key],
        defaults[key]
      )
      return
    }

    if (withoutDefaults[key] === defaults[key]) {
      delete withoutDefaults[key]
    }
  })

  return withoutDefaults
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

autorun(() => {
  const currentCode = formatCode(
    (value) => `Indicate({ element: '.demo'${value} })`,
    (value) => `, options: ${value}`
  )
  const code = document.getElementById('code-regular')
  code.innerHTML = currentCode
  // Remove existing instance (when options edited).
  remove('.demo')
  // Insert tiles according to current count.
  insertTiles()
  // Initialize indicate effect with currently selected options.
  indicate({ element: '.demo', options })
})

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

const handleOptions = (data: any) =>
  runInAction(() => Object.assign(options, data))

const handleStyles = (data: any) => {
  const element: HTMLElement = document.querySelector('.demo')
  element.style.maxHeight = data.maxHeight
}

render(
  <div className="edits">
    <div className="options">
      <h2>Edit Options</h2>
      <Konfi schema={schema} data={options} onChange={handleOptions} />
    </div>
    <div className="styles">
      <h2>Edit Styles</h2>
      <Konfi data={styles} onChange={handleStyles} />
    </div>
  </div>,
  document.getElementById('options')
)

const Indicate = observer(() => {
  const ref = useIndicate<HTMLDivElement>(options)

  return (
    <div className="demo" ref={ref}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
        <p key={index} className="tile" />
      ))}
    </div>
  )
})

const ReactCode = observer(() => (
  <pre className="code">
    {formatCode(
      (value) => `import { useIndicate } from 'indicate'
    
const Indicate = () => {
  const ref = useIndicate(${value})

  return (
    <div ref={ref}>
      {\`...\`}
    </div>
  )
}`
    )}
  </pre>
))

render(
  <>
    <h2>React</h2>
    <Indicate />
    <ReactCode />
  </>,
  document.getElementById('react')
)
