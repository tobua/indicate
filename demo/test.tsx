import { useState, useEffect, useRef, forwardRef } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Tiles } from 'react-preview'
import { indicate, remove, Indicate } from 'indicate'
import youtube from 'indicate/theme/youtube'
import className from 'indicate/theme/class-name'
import { Button } from 'markup/Button'

const TableHeader = (name) => (
  <th
    style={{
      minWidth: '20vw',
      padding: 10,
      borderRadius: 10,
      background: 'lightgray',
    }}
  >
    {name}Header
  </th>
)

const TableColumn = (name) => (
  <td
    style={{
      padding: 10,
      borderRadius: 10,
      background: 'lightskyblue',
    }}
  >
    {name}Column
  </td>
)

export const Table = forwardRef<HTMLTableElement, { className?: string }>(
  ({ className = '' }, ref) => (
    <table ref={ref} className={className}>
      <thead>
        <tr>
          {TableHeader('First')}
          {TableHeader('Second')}
          {TableHeader('Third')}
          {TableHeader('Fourth')}
          {TableHeader('Fifth')}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 3 }).map((_, index) => (
          <tr key={index}>
            {TableColumn('First')}
            {TableColumn('Second')}
            {TableColumn('Third')}
            {TableColumn('Fourth')}
            {TableColumn('Fifth')}
          </tr>
        ))}
      </tbody>
    </table>
  )
)

const renderTestCases = () => {
  indicate('.simple')
  indicate('.vertical', {
    inlineStyles: { innerWrapper: { flexDirection: 'column' } },
  })
  indicate('.no-click', { click: false })
  indicate('.no-arrow', { arrow: false })
  indicate('.pointer', { arrow: { icon: 'pointer', color: '#FF00FF' } })
  indicate('.color', { color: '#FF00FF' })
  indicate('.overflow')
  indicate('.inline')
  indicate('.inline-vertical')
  indicate('.inline-by-class')
  indicate('.inline-display')
  indicate('.table')
  indicate('.theme-youtube', { theme: youtube })
  indicate('.theme-class-name', { theme: className })
  indicate('.padding')
  indicate('.margin')
  indicate(document.getElementById('get-by-id'))
  indicate(document.querySelectorAll('.get-by-class'))
  indicate('.show-scrollbar', { hideScrollbar: false })
  indicate('.remove')
  remove('.remove')
}

const removeTestCases = () => remove('.test')

const toggleTestCases = () => {
  if (document.querySelector('.hide-indicate-scrollbar')) {
    removeTestCases()
  } else {
    renderTestCases()
  }
}

const ServerSideRendering = () => {
  const [renderedMarkup, setMarkup] = useState('')
  const reactRef = useRef()
  const reactStyleRef = useRef()
  const reactTableRef = useRef()

  useEffect(() => {
    const markup = (
      <>
        <h4>Regular</h4>
        <Indicate className="react-server-regular">
          <Tiles />
        </Indicate>
        <h4>Table</h4>
        <Indicate className="react-server-table">
          <Table />
        </Indicate>
        <h4>childAsElement</h4>
        <Indicate
          ref={reactRef}
          childAsElement
          style={{ display: 'inline-flex' }}
          className="react-server-child"
        >
          <div ref={reactRef}>
            <Tiles />
          </div>
        </Indicate>
        <h4>Table as Element</h4>
        <Indicate ref={reactTableRef} childAsElement className="react-server-child-table">
          <Table ref={reactTableRef} />
        </Indicate>
        <h4>inlineStyles</h4>
        <Indicate
          outerStyle={{
            backgroundColor: 'red',
          }}
          innerStyle={{
            backgroundColor: 'blue',
          }}
          style={{
            color: 'yellow',
          }}
          className="react-server-regular-styles"
        >
          <Tiles />
        </Indicate>
        <h4>inlineStyles with childAsElement</h4>
        <Indicate
          ref={reactStyleRef}
          childAsElement
          outerStyle={{
            backgroundColor: 'red',
          }}
          innerStyle={{
            display: 'inline-flex',
          }}
          style={{
            color: 'yellow',
          }}
          className="react-server-regular-child-styles"
        >
          <div ref={reactStyleRef}>
            <Tiles />
          </div>
        </Indicate>
      </>
    )

    setMarkup(renderToStaticMarkup(markup))
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: renderedMarkup }} />
}

export const TestCases = () => {
  const reactRef = useRef()
  const reactStylesRef = useRef()
  const reactTableRef = useRef()

  useEffect(() => {
    renderTestCases()
  })

  return (
    <>
      <p>
        These test cases are used to run automated tests with cypress and also quickly spot issues
        after changes.
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Default</h2>
        <Button id="toggle" color="green" onClick={toggleTestCases}>
          Toggle Effect
        </Button>
      </div>
      <div style={{ whiteSpace: 'nowrap' }} className="test simple">
        <Tiles />
      </div>
      <h2>Vertical</h2>
      <div style={{ whiteSpace: 'nowrap', height: 120 }} className="test vertical">
        <Tiles rows={2} />
      </div>
      <h2>No Click</h2>
      <div style={{ whiteSpace: 'nowrap' }} className="test no-click">
        <Tiles />
      </div>
      <h2>No Arrow</h2>
      <div style={{ whiteSpace: 'nowrap' }} className="test no-arrow">
        <Tiles />
      </div>
      <h2>Colored Pointer Arrow Icon</h2>
      <div style={{ whiteSpace: 'nowrap' }} className="test pointer">
        <Tiles />
      </div>
      <h2>Color</h2>
      <div style={{ whiteSpace: 'nowrap' }} className="test color">
        <Tiles />
      </div>
      <h2>Minimal Overflow</h2>
      <div style={{ display: 'inline-block' }}>
        <div style={{ width: 100, height: 50 }} className="test overflow">
          <div style={{ width: 101, height: 51, fontSize: 10 }}>
            Only one pixel overflow in both directions.
          </div>
        </div>
      </div>
      <h2>Inline</h2>
      <p>
        Adding absolutely positioned indicators to an inline element isn't possible so inline
        elements are converted to inline-block.
      </p>
      <div
        style={{
          display: 'inline',
          width: 300,
        }}
        className="test inline"
      >
        <div style={{ display: 'flex' }}>
          <Tiles />
        </div>
      </div>
      <div
        style={{
          display: 'inline-block',
          width: 300,
        }}
        className="test inline"
      >
        <div style={{ display: 'flex' }}>
          <Tiles />
        </div>
      </div>
      <h3>Inline vertical</h3>
      <div
        style={{
          display: 'inline',
          width: 300,
          height: 80,
          marginRight: '2%',
        }}
        className="test inline-vertical"
      >
        <div style={{ display: 'flex' }}>
          <Tiles />
        </div>
      </div>
      <h3>Inline from class</h3>
      <style>
        {`.inline-by-class {
          display: inline;
          max-width: 50vw;
        }`}
      </style>
      <div className="test inline-by-class">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Tiles />
        </div>
      </div>
      <h3>Inline-block and inline-flex</h3>
      <div className="test inline-display" style={{ display: 'inline-block', width: 400 }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Tiles />
        </div>
      </div>
      <div className="test inline-display" style={{ display: 'inline-flex', width: 400 }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Tiles />
        </div>
      </div>
      <h2>Table</h2>
      <Table className="test table" />
      <h2>Themes</h2>
      <h3>YouTube</h3>
      <div style={{ whiteSpace: 'nowrap' }} className="test theme-youtube">
        <Tiles />
      </div>
      <h3>Class Names</h3>
      <div style={{ whiteSpace: 'nowrap' }} className="test theme-class-name">
        <Tiles />
      </div>
      <h2>Custom Styles</h2>
      <h3>Padding</h3>
      <div
        style={{
          whiteSpace: 'nowrap',
          background: 'lightgray',
          padding: '20px',
        }}
        className="test padding"
      >
        <Tiles />
      </div>
      <h3>Margin</h3>
      <div
        style={{
          whiteSpace: 'nowrap',
          background: 'lightgray',
          margin: '20px',
        }}
        className="test margin"
      >
        <Tiles />
      </div>
      <h2>Initialization</h2>
      <h3>Node</h3>
      <div style={{ whiteSpace: 'nowrap' }} id="get-by-id" className="test">
        <Tiles />
      </div>
      <h3>Nodelist</h3>
      <div style={{ whiteSpace: 'nowrap' }} className="test get-by-class">
        <Tiles />
      </div>
      <div style={{ whiteSpace: 'nowrap' }} className="test get-by-class">
        <Tiles />
      </div>
      <h2>Show Native Scrollbar</h2>
      <div style={{ whiteSpace: 'nowrap' }} className="test show-scrollbar">
        <Tiles />
      </div>
      <h2>Removal</h2>
      <p>No leftovers after plugin initialized on element and removed again.</p>
      <div style={{ display: 'flex' }} className="remove">
        <Tiles />
      </div>
      <h2>React</h2>
      <Indicate className="react-regular">
        <Tiles />
      </Indicate>
      <h3>Table</h3>
      <Indicate className="react-table">
        <Table />
      </Indicate>
      <h3>childAsElement</h3>
      <Indicate ref={reactRef} childAsElement className="react-child">
        <div ref={reactRef}>
          <Tiles />
        </div>
      </Indicate>
      <h3>childAsElement with inlineStyles</h3>
      <Indicate
        ref={reactStylesRef}
        childAsElement
        outerStyle={{
          backgroundColor: 'red',
        }}
        innerStyle={{
          backgroundColor: 'red',
        }}
        style={{
          color: 'yellow',
        }}
        className="react-child-styles"
      >
        <div ref={reactStylesRef}>
          <Tiles />
        </div>
      </Indicate>
      <h3>Table as Element</h3>
      <Indicate ref={reactTableRef} childAsElement className="react-child-table">
        <Table ref={reactTableRef} />
      </Indicate>
      <h3>Server-Side Rendering</h3>
      <ServerSideRendering />
    </>
  )
}
