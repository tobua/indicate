import React, { useEffect } from 'react'
import { Tiles } from 'react-preview'
import { indicate } from 'indicate'

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
  indicate('.color', { color: '#FF00FF' })
  indicate('.inline')
}

export const TestCases = () => {
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
      <Table className="test table" />
    </>
  )
}
