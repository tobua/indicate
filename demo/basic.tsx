import React from 'react'

const outerWrapperStyles = {
  background: '#757575',
  padding: 10,
  // Required to position indicators absolutely.
  position: 'relative' as 'relative',
}

const indicatorStyles = {
  background: 'blue',
  width: 20,
  height: 20,
  position: 'absolute' as 'absolute',
  bottom: 0,
  right: 0,
}

const elementStyles = {
  background: '#9E9E9E',
  padding: 10,
  height: 100,
  // Required so that overflow hidden and scrollable.
  overflow: 'auto',
}

const innerWrapperStyles = {
  background: '#E0E0E0',
  padding: 10,
  // Required to position observers absolutely.
  position: 'relative' as 'relative',
  // Required to stretch to full content.
  display: 'inline-block',
}

const observerStyles = {
  background: 'red',
  width: 20,
  height: 20,
  position: 'absolute' as 'absolute',
  bottom: 0,
  right: 0,
}

const contentStyles = {
  background: '#EEEEEE',
  padding: 10,
  width: 1200,
  height: 150,
}

export const Basic = () => (
  <>
    <p>
      The following elements illustrate the elements and CSS properties the
      plugin uses to position the indicators and observers and therefore achieve
      the desired affect. Padding and background added to make different
      elements distinguishable.
    </p>
    <h2>Block</h2>
    <div style={outerWrapperStyles}>
      <div style={elementStyles}>
        <div style={innerWrapperStyles}>
          <div style={contentStyles}>
            Scroll to bottom right to reveal the observer element.
          </div>
          <span style={observerStyles} />
        </div>
      </div>
      <span style={indicatorStyles} />
    </div>
    <h2>Inline</h2>
    <span style={{ ...outerWrapperStyles, display: 'inline-block' }}>
      <span
        style={{
          ...innerWrapperStyles,
          overflow: 'auto',
          width: 150,
          height: 100,
        }}
      >
        <span
          style={{
            ...elementStyles,
            position: 'relative',
            display: 'inline-block',
            overflow: 'visible',
            height: 'auto',
          }}
        >
          <div style={{ ...contentStyles, width: 300 }} />
          <span style={observerStyles} />
        </span>
      </span>
      <span style={indicatorStyles} />
    </span>
    <span style={{ display: 'inline-block', width: 20 }} />
    <span style={outerWrapperStyles}>
      <span
        style={{
          ...innerWrapperStyles,
          overflow: 'auto',
          width: 150,
          height: 100,
        }}
      >
        <div
          style={{
            ...elementStyles,
            position: 'relative',
            display: 'inline',
            overflow: 'visible',
            height: 'auto',
          }}
        >
          <div style={{ ...contentStyles, width: 300 }} />
          <span style={observerStyles} />
        </div>
      </span>
      <span style={indicatorStyles} />
    </span>
    <h2>Table (Inline)</h2>
    <span style={outerWrapperStyles}>
      <span
        style={{
          ...innerWrapperStyles,
          overflow: 'auto',
          width: 150,
          height: 100,
        }}
      >
        <table
          style={{
            ...elementStyles,
            position: 'relative',
            overflow: 'visible',
            whiteSpace: 'nowrap',
          }}
        >
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td>This is a lot of text to cause overflow.</td>
                <td>This is a lot of text to cause overflow.</td>
              </tr>
            ))}
            <tr style={observerStyles} />
          </tbody>
        </table>
      </span>
      <span style={indicatorStyles} />
    </span>
    <br />
    <br />
    <br />
    <div style={{ display: 'flex', gap: 10 }}>
      <span style={{ padding: 10, color: 'white', background: '#757575' }}>
        Outer Wrapper
      </span>
      <span style={{ padding: 10, color: 'black', background: '#9E9E9E' }}>
        Element
      </span>
      <span style={{ padding: 10, color: 'black', background: '#E0E0E0' }}>
        Inner Wrapper
      </span>
      <span style={{ padding: 10, color: 'black', background: '#EEEEEE' }}>
        Content
      </span>
      <span style={{ padding: 10, color: 'white', background: 'red' }}>
        Observer
      </span>
      <span style={{ padding: 10, color: 'white', background: 'blue' }}>
        Indicator
      </span>
    </div>
  </>
)
