import React from 'react'
import { render } from 'react-dom'
import { observer } from 'mobx-react'
import { Indicate } from 'indicate'
import { formatCode } from 'code'
import { options, styles } from 'state'

const nonStyleProps = ['rows', 'tiles']

// Remove non-CSS properties from styles.
const getElementStyleProps = (fullProps) => {
  const styleProps = { ...fullProps }

  nonStyleProps.forEach((property) => {
    if (Object.prototype.hasOwnProperty.call(styleProps, property)) {
      delete styleProps[property]
    }
  })

  return styleProps
}

const tileArray = (count: number) =>
  Array.from({ length: count }).map((_, index) => (
    <p key={index} className="tile" />
  ))

const Plugin = observer(() => {
  return (
    <Indicate
      as="div"
      className="element"
      style={getElementStyleProps(styles)}
      {...options}
    >
      {styles.rows < 2
        ? tileArray(styles.tiles)
        : Array.from({ length: styles.rows }).map((_, index) => (
            <div key={index}>{tileArray(styles.tiles)}</div>
          ))}
    </Indicate>
  )
})

const ReactCode = observer(() => (
  <pre className="code">
    {formatCode(
      (value) => `import { Indicate } from 'indicate'
      
  const Scrollable = () => {
    return (
      <Indicate as="div">
        {\`...\`}
      </Indicate>
    )
  }`
    )}
  </pre>
))

render(
  <>
    <h2>React</h2>
    <Plugin />
    <ReactCode />
  </>,
  document.getElementById('react')
)
