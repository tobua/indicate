import { observer } from 'mobx-react-lite'
import { Code } from 'exmpl'
import { Indicate } from 'indicate'
import { formatCode, addDirectionToOptions } from 'code'
import { styles } from 'state'

const nonStyleProps = ['rows', 'tiles']

const objectToComponentProps = (values: Object) => {
  let result = ''

  Object.keys(values).forEach((key) => {
    const value = values[key]

    result += ` ${key}`

    // Implicity true for boolean props.
    if (value === true) {
      return
    }

    if (typeof value === 'string') {
      result += `=${JSON.stringify(value)}`
      return
    }

    result += `={${JSON.stringify(value)}}`
  })

  return result
}

// Remove non-CSS properties from styles.
const getElementStyleProps = (fullProps) => {
  const styleProps = {
    ...fullProps,
    whiteSpace: 'nowrap',
    maxHeight: styles.maxHeight,
  }

  nonStyleProps.forEach((property) => {
    if (Object.prototype.hasOwnProperty.call(styleProps, property)) {
      delete styleProps[property]
    }
  })

  return styleProps
}

const tileArray = (count: number) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <p key={index} className="tile" />
    ))}
  </>
)

export const Tiles = ({ rows = 1, columns = 9 }: { rows?: number; columns?: number }) => {
  if (rows < 2) {
    return tileArray(columns)
  }

  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          style={{
            display: 'inline-flex',
            marginBottom: index === rows - 1 ? 0 : 10,
          }}
          key={index}
        >
          {tileArray(columns)}
        </div>
      ))}
    </>
  )
}

const Plugin = observer((props: { noEffect?: boolean }) => (
  <Indicate
    as="div"
    style={getElementStyleProps(styles)}
    {...addDirectionToOptions(styles.rows)}
    {...props}
  >
    <Tiles rows={styles.rows} columns={styles.tiles} />
  </Indicate>
))

const ReactCode = observer(() => (
  <Code>
    {formatCode(
      (_, values) => `import { Indicate } from 'indicate'
      
  const Scrollable = () => (
    <Indicate as="div"${objectToComponentProps(values)}>
      {\`...\`}
    </Indicate>
  )`
    )}
  </Code>
))

export const ReactPreview = () => (
  <>
    <h2>React</h2>
    <Plugin />
    <ReactCode />
  </>
)
