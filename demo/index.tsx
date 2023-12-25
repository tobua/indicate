import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { autorun, runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Konfi } from 'konfi'
import { Exmpl, Code, Tabs } from 'exmpl'
import './styles.css'
import { indicate, remove } from 'indicate'
import { ReactPreview } from 'react-preview'
import { formatCode, addDirectionToOptions } from 'code'
import { options, styles, optionsSchema, getTheme } from 'state'
import { TestCases, Table } from 'test'
import { Integrations } from 'integration'
import { Basic } from 'basic'

// https://stackoverflow.com/a/30452949/3185545 if index required.
const times = (count: number) => (callback: (count?: number) => void) => {
  if (count > 0) {
    callback(count - 1)
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
    times(styles.rows)((index) => {
      const wrapper = document.createElement('div')
      wrapper.style.display = 'flex'
      if (index !== 0) {
        wrapper.style.marginBottom = '10px'
      }
      createTiles(wrapper, styles.tiles)
      element.append(wrapper)
    })
  }

  // Initialize indicate effect with currently selected options.
  indicate('.demo', addDirectionToOptions(styles.rows))
}

const handleOptions = (data: any) => {
  data.theme = getTheme(data.theme)
  runInAction(() => Object.assign(options, data))
}

const handleStyles = (data: any) => runInAction(() => Object.assign(styles, data))

// Code preview matching current options.
const CodePreview = observer(() => {
  const [code, setCode] = useState('Formatting...')

  useEffect(() => {
    async function startFormatting() {
      setCode(
        await formatCode(
          (value) => `import { indicate } from 'indicate'
  
  indicate('.demo'${value})`,
          (value) => `, ${value}`,
        ),
      )
    }

    startFormatting()
  }, [])

  return <Code>{code}</Code>
})

const Demo = () => {
  useEffect(() => {
    autorun(renderIndicate)
  })

  return (
    <>
      <div className="demo"></div>
      <div className="edits">
        <div style={{ flex: 1 }}>
          <h2>Edit Options</h2>
          <Konfi schema={optionsSchema} data={options} onChange={handleOptions} />
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
      <Table className="demo" />
    </>
  )
}

const Body = () => {
  return (
    <Exmpl title="indicate Demo" npm="indicate" github="tobua/indicate">
      <Tabs
        // Remove instances first, so that react tree is intact again.
        onChange={() => remove('.demo, .test')}
        labels={['Options', 'How?', 'Examples', 'Test Cases']}
        style={{ marginBottom: 10 }}
      >
        <Demo />
        <Basic />
        <Integrations />
        <TestCases />
      </Tabs>
    </Exmpl>
  )
}

createRoot(document.body).render(<Body />)
