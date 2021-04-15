import React, { useEffect } from 'react'
import { Tiles } from 'react-preview'
import { indicate, remove } from 'indicate'
import youtube from 'indicate/dist/theme/youtube'
import className from 'indicate/dist/theme/class-name'
import { Button } from 'markup/Button'

export const Table = ({ className }) => (
  <table className={className}>
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
)

const renderTestCases = () => {
  indicate('.simple')
  indicate('.no-click', { click: false })
  indicate('.no-arrow', { arrow: false })
  indicate('.pointer', { arrow: { icon: 'pointer', color: '#FF00FF' } })
  indicate('.color', { color: '#FF00FF' })
  indicate('.inline')
  indicate('.table')
  indicate('.theme-youtube', { theme: youtube })
  indicate('.theme-class-name', { theme: className })
  indicate('.padding')
  indicate('.margin')
}

const removeTestCases = () => remove('.test')

const toggleTestCases = () => {
  if (document.querySelector('.hide-indicate-scrollbar')) {
    removeTestCases()
  } else {
    renderTestCases()
  }
}

export const TestCases = () => {
  useEffect(() => {
    renderTestCases()
  })

  return (
    <>
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
      <h2>Inline</h2>
      <div
        style={{
          display: 'inline-block',
          width: '49%',
          marginRight: '2%',
          whiteSpace: 'nowrap',
        }}
        className="test inline"
      >
        <Tiles />
      </div>
      <div
        style={{
          display: 'inline-block',
          width: '49%',
          whiteSpace: 'nowrap',
        }}
        className="test inline"
      >
        <Tiles />
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
    </>
  )
}
