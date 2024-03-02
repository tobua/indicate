import { Indicate } from 'indicate/modern'
import { Tiles } from 'react-preview'

export function Modern() {
  return (
    <>
      <h4>Narrow</h4>
      <Indicate
        style={{
          maxWidth: 300,
        }}
      >
        <Tiles />
      </Indicate>
      <h4>Wide</h4>
      <Indicate
        style={{
          display: 'flex',
          maxWidth: 600,
        }}
      >
        <Tiles />
      </Indicate>
      <h4>No overflow</h4>
      <Indicate>
        <Tiles columns={5} />
      </Indicate>
      <h4>Vertical</h4>
      <Indicate
        style={{
          display: 'flex', // Required for vertical scrolling.
          maxWidth: 300,
          maxHeight: 100,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Tiles rows={2} />
        </div>
      </Indicate>
    </>
  )
}
