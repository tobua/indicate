import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { autorun, runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Konfi } from 'konfi'
import { Exmpl, Code } from 'exmpl'
import { Router, Page } from 'epic-react-router'
import './styles.css'
import { indicate, remove } from 'indicate'
import { ReactPreview, Tiles } from 'react-preview'
import { formatCode } from 'code'
import { options, styles, optionsSchema, getTheme } from 'state'

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
  // Remove existing instance, except on first render.
  if (document.readyState !== 'interactive') {
    remove('.demo')
  }

  const element: HTMLElement = document.querySelector('.demo')

  if (!element) {
    return
  }

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

const handleOptions = (data: any) => {
  data.theme = getTheme(data.theme)
  runInAction(() => Object.assign(options, data))
}

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

const renderTestCases = () => {
  indicate({ element: '.simple' })
  indicate({ element: '.no-click', options: { click: false } })
  indicate({ element: '.no-arrow', options: { arrow: false } })
  indicate({ element: '.color', options: { color: '#FF00FF' } })
  indicate({ element: '.inline' })
}

const TestCases = () => {
  useEffect(() => {
    renderTestCases()
  })

  return (
    <>
      <h2>Default</h2>
      <div style={{ whiteSpace: 'nowrap' }} className="test simple">
        <Tiles />
      </div>
      <h2>No Click</h2>
      <div style={{ whiteSpace: 'nowrap' }} className="test no-click">
        <Tiles />
      </div>
      <h2>No Arrow</h2>
      <div style={{ whiteSpace: 'nowrap' }} className="test no-arrow">
        <Tiles />
      </div>
      <h2>Color</h2>
      <div style={{ whiteSpace: 'nowrap' }} className="test color">
        <Tiles />
      </div>
      <h2>Inline</h2>
      <div
        style={{ display: 'inline', width: '49%', whiteSpace: 'nowrap' }}
        className="test inline"
      >
        <Tiles />
      </div>
      <div
        style={{ display: 'inline', width: '49%', whiteSpace: 'nowrap' }}
        className="test inline"
      >
        <Tiles />
      </div>
    </>
  )
}

const Demo = () => {
  useEffect(() => {
    autorun(renderIndicate)
  })

  return (
    <>
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
      <h2>Use Cases</h2>
      <h3>Table</h3>
      <table className="demo">
        <thead>
          <tr>
            <th>FirstHeader</th>
            <th colSpan={2}>SecondThirdHeader</th>
            <th>FourthHeader</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FirstColumnFirstColumnFirstColumn</td>
            <td>SecondColumnSecondColumnSecondColumn</td>
            <td>ThirdColumnThirdColumnThirdColumn</td>
            <td>FourthColumnFourthColumnFourthColumn</td>
          </tr>
          <tr>
            <td>FirstColumn FirstColumn FirstColumn</td>
            <td>SecondColumn SecondColumn SecondColumn</td>
            <td>ThirdColumn ThirdColumn ThirdColumn</td>
            <td>FourthColumn FourthColumn FourthColumn</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

Router.setPages(
  {
    demo: Demo,
    test: TestCases,
  },
  'demo'
)

const Title = observer(() => (
  <>
    <span>
      indicate {Router.route !== Router.initialRoute ? 'Test Cases' : 'Demo'}
    </span>
    <button
      onClick={() => {
        // Remove instances first, so that react tree is intact again.
        remove('.demo')
        remove('.test')
        Router.go(Router.route === Router.initialRoute ? 'test' : 'demo')
      }}
      style={{
        background: '#59E28A',
        marginLeft: 20,
        height: '100%',
        border: '2px solid #1FC95B',
        borderRadius: 10,
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      {Router.route === Router.initialRoute ? 'Test Cases' : 'Demo'}
    </button>
  </>
))

const Body = () => {
  return (
    <Exmpl
      // @ts-ignore
      title={<Title />}
      npm="indicate"
      github="tobua/indicate"
    >
      <Page />
    </Exmpl>
  )
}

render(<Body />, document.body)
