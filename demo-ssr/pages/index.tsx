import { useRef, Fragment } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Indicate } from 'indicate'

const Box = () => (
  <div
    style={{
      display: 'flex',
      width: 50,
      height: 50,
      background: 'lightblue',
      borderRadius: 5,
      marginRight: 10,
    }}
  />
)

const FewBoxes = () => (
  <>
    <Box />
    <Box />
    <Box />
  </>
)

const Boxes = () => (
  <>
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
    <Box />
  </>
)

const Table = () => (
  <tbody>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
    <tr>
      <td style={{ whiteSpace: 'nowrap' }}>Alfreds Futterkiste</td>
      <td style={{ whiteSpace: 'nowrap' }}>Maria Anders and Much More Text</td>
      <td style={{ whiteSpace: 'nowrap' }}>Germany and Some More Text</td>
    </tr>
    <tr>
      <td style={{ whiteSpace: 'nowrap' }}>Centro comercial Moctezuma</td>
      <td style={{ whiteSpace: 'nowrap' }}>Francisco Chang</td>
      <td style={{ whiteSpace: 'nowrap' }}>Mexico and Some More Text</td>
    </tr>
    <tr>
      <td style={{ whiteSpace: 'nowrap' }}>Centro comercial Moctezuma</td>
      <td style={{ whiteSpace: 'nowrap' }}>Francisco Chang</td>
      <td style={{ whiteSpace: 'nowrap' }}>Mexico and Some More Text</td>
    </tr>
    <tr>
      <td style={{ whiteSpace: 'nowrap' }}>Centro comercial Moctezuma</td>
      <td style={{ whiteSpace: 'nowrap' }}>Francisco Chang</td>
      <td style={{ whiteSpace: 'nowrap' }}>Mexico and Some More Text</td>
    </tr>
  </tbody>
)

const Home: NextPage = () => {
  const childRef = useRef<HTMLElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main style={{ fontFamily: 'sans-serif', margin: 'auto', maxWidth: '60ch' }}>
        <h1>Indicate SSR</h1>
        <pre>{`<Indicate>`}</pre>
        <Indicate>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate>`}</pre>
        <Indicate>
          <FewBoxes />
        </Indicate>
        <pre>{`<Indicate horizontal>`}</pre>
        <Indicate horizontal>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate arrow={false}>`}</pre>
        <Indicate arrow={false}>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate style={{ height: '90px' }}>`}</pre>
        <Indicate style={{ height: '90px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Boxes />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Boxes />
            </div>
          </div>
        </Indicate>
        <pre>{`<Indicate color="red">`}</pre>
        <Indicate color="red">
          <Boxes />
        </Indicate>
        <pre>{`<Indicate width="80px">`}</pre>
        <Indicate width="80px">
          <Boxes />
        </Indicate>
        <pre>{`<Indicate as="table">
<Indicate style={{ display: 'inline' }}>`}</pre>
        <Indicate as="table" style={{ height: '90px' }}>
          <Table />
        </Indicate>
        <h2>Hydrated</h2>
        <pre>{`<Indicate client:load>`}</pre>
        <Indicate>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate>`}</pre>
        <Indicate>
          <FewBoxes />
        </Indicate>
        <pre>{`<Indicate horizontal>`}</pre>
        <Indicate horizontal>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate arrow={false}>`}</pre>
        <Indicate arrow={false}>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate click={false}>`}</pre>
        <Indicate click={false}>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate style={{ height: '90px' }}>`}</pre>
        <Indicate style={{ height: '90px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Boxes />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Boxes />
            </div>
          </div>
        </Indicate>
        <pre>{`<Indicate color="red">`}</pre>
        <Indicate color="red">
          <Boxes />
        </Indicate>
        <pre>{`<Indicate width="80px">`}</pre>
        <Indicate width="80px">
          <Boxes />
        </Indicate>
        <pre>{`<Indicate arrow={{ icon: 'pointer' }}>`}</pre>
        <Indicate arrow={{ icon: 'pointer' }}>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate arrow={{ color: 'blue' }}>`}</pre>
        <Indicate arrow={{ color: 'blue' }}>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate arrow={{ image: '/arrow.png' }}>`}</pre>
        <Indicate arrow={{ image: '/arrow.png' }}>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate arrow={{ image: 'data:image/svg+xml;base64,...' }}>`}</pre>
        <Indicate
          arrow={{
            image:
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZGVmcz4KICA8Y2xpcFBhdGggaWQ9ImEiPgogICA8cGF0aCBkPSJtMjM5IDE1OWgzNzMuNzl2NDM0aC0zNzMuNzl6Ii8+CiAgPC9jbGlwUGF0aD4KIDwvZGVmcz4KIDxwYXRoIGQ9Im0yMTIuNDcgNTM5LjU0Yy00My42Ni00My42Ni02Ny43MDctMTAxLjc1LTY3LjcwNy0xNjMuNTQgMC02MS43ODUgMjQuMDQ3LTExOS44OCA2Ny43MDctMTYzLjUzIDQzLjY1Ni00My42NiAxMDEuNzUtNjcuNzA3IDE2My41My02Ny43MDcgNjEuNzg5IDAgMTE5Ljg4IDI0LjA1MSAxNjMuNTQgNjcuNzA3IDQzLjY1NiA0My42NTYgNjcuNzA3IDEwMS43NSA2Ny43MDcgMTYzLjUzIDAgNjEuNzg5LTI0LjA1MSAxMTkuODgtNjcuNzA3IDE2My41NC00My42NiA0My42NTYtMTAxLjc1IDY3LjcwNy0xNjMuNTQgNjcuNzA3LTYxLjc4NSAwLTExOS44OC0yNC4wNTEtMTYzLjUzLTY3LjcwN3ptLTQ5LjIwNy0xNjMuNTRjMCAxMTcuMjkgOTUuNDU3IDIxMi43NCAyMTIuNzQgMjEyLjc0czIxMi43NC05NS40NTcgMjEyLjc0LTIxMi43NGMtMC4wMDM5MDYtMTE3LjI5LTk1LjQ2MS0yMTIuNzQtMjEyLjc1LTIxMi43NHMtMjEyLjc0IDk1LjQ1My0yMTIuNzQgMjEyLjc0eiIvPgogPHBhdGggZD0ibTM2OS45OSA0MzYuMzEgNjAuMzA5LTYwLjMwOS02MC4zMDktNjAuMzA5IDI1LjYyMS0yNS43MTUgODYuMDIzIDg2LjAyMy04Ni4wMjMgODYuMDIzem0yNS42MjEtMTM2LjYyLTE2IDE2LjA5NCA2MC4zMDkgNjAuMzA5LTYwLjMwOSA2MC4zMDkgMTYgMTYuMDk0IDc2LjQwMi03Ni40MDJ6Ii8+CiA8ZyBjbGlwLXBhdGg9InVybCgjYSkiPgogIDxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC45MjQ5NiAwIDAgLjkyNDk2IDEzOS4yMSAxMzkuMjEpIiBkPSJtMjQ5LjUgMzIxLjIgNjUuMjAxLTY1LjIwMS02NS4yMDEtNjUuMjAxIDI3LjctMjcuODAxIDkzLjAwMiA5My4wMDItOTMuMDAyIDkzLjAwMnptMjcuNy0xNDcuNy0xNy4yOTggMTcuMzk5IDY1LjIwMSA2NS4yMDEtNjUuMjAxIDY1LjIwMSAxNy4yOTggMTcuMzk5IDgyLjYtODIuNnoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjEwIi8+CiA8L2c+CiA8cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCguOTI0OTYgMCAwIC45MjQ5NiAxMzkuMjEgMTM5LjIxKSIgZD0ibTE1My45IDMyMS4yIDY1LjEtNjUuMjAxLTY1LjIwMS02NS4yMDEgMjcuNy0yNy44MDEgOTMuMDAyIDkzLjAwMi05My4wMDIgOTMuMDAyem0yNy41OTgtMTQ3LjctMTcuMjk4IDE3LjM5OSA2NS4yMDEgNjUuMjAxLTY1LjIwMSA2NS4yMDEgMTcuMjk4IDE3LjM5OSA4Mi42LTgyLjZ6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIxMCIvPgo8L3N2Zz4K',
          }}
        >
          <Boxes />
        </Indicate>
        <pre>{`<Indicate arrow={{ markup: '>' }}>`}</pre>
        <Indicate arrow={{ markup: '>' }}>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate arrow={{ markup: <span>{\`>\`}</span> }}>`}</pre>
        <Indicate arrow={{ markup: <span>{`>`}</span> }}>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate arrow={{ position: 'end' }}>`}</pre>
        <Indicate arrow={{ position: 'end' }}>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate hideScrollbar={false}>`}</pre>
        <Indicate hideScrollbar={false}>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate hideScrollbar={false} className="hello-class">`}</pre>
        <Indicate hideScrollbar={false} className="hello-class">
          <Boxes />
        </Indicate>
        <pre>{`<Indicate as="table">`}</pre>
        <Indicate as="table">
          <Table />
        </Indicate>
        <pre>{`<Indicate style={{ display: 'inline-flex' }}>
<Indicate as="span">`}</pre>
        <Indicate style={{ display: 'inline-flex', width: 150 }}>
          <Boxes />
        </Indicate>
        <Indicate style={{ display: 'inline-block', width: 150 }}>
          <Boxes />
        </Indicate>
        <Indicate style={{ display: 'inline-inline', width: 150 }}>
          <Boxes />
        </Indicate>
        <Indicate as="span" style={{ width: 150 }}>
          <Boxes />
        </Indicate>
        <pre>{`<Indicate theme={{ ... }}>`}</pre>
        <Indicate
          theme={{
            outerWrapper: { border: '5px solid red' },
            element: { border: '5px solid green' },
            innerWrapper: { border: '5px solid blue' },
            indicator: { border: '2px solid yellow' },
            observer: { border: '2px solid purple' },
            show: () => ({ backgroundColor: 'salmon' }),
            hide: () => ({ backgroundColor: 'lime', opacity: 0.2 }),
          }}
        >
          <Boxes />
        </Indicate>
        <pre>{`<Indicate childAsElement>`}</pre>
        <Indicate childAsElement ref={childRef}>
          <section style={{ display: 'inline-flex' }} ref={childRef}>
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
          </section>
        </Indicate>
        {/* <Indicate childAsElement ref={tableRef}>
          <table ref={tableRef}>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
            </tr>
            <tr>
              <td style={{ whiteSpace: 'nowrap' }}>Alfreds Futterkiste</td>
              <td style={{ whiteSpace: 'nowrap' }}>Maria Anders and Much More Text</td>
              <td style={{ whiteSpace: 'nowrap' }}>Germany and Some More Text</td>
            </tr>
            <tr>
              <td style={{ whiteSpace: 'nowrap' }}>Centro comercial Moctezuma</td>
              <td style={{ whiteSpace: 'nowrap' }}>Francisco Chang</td>
              <td style={{ whiteSpace: 'nowrap' }}>Mexico and Some More Text</td>
            </tr>
            <tr>
              <td style={{ whiteSpace: 'nowrap' }}>Centro comercial Moctezuma</td>
              <td style={{ whiteSpace: 'nowrap' }}>Francisco Chang</td>
              <td style={{ whiteSpace: 'nowrap' }}>Mexico and Some More Text</td>
            </tr>
            <tr>
              <td style={{ whiteSpace: 'nowrap' }}>Centro comercial Moctezuma</td>
              <td style={{ whiteSpace: 'nowrap' }}>Francisco Chang</td>
              <td style={{ whiteSpace: 'nowrap' }}>Mexico and Some More Text</td>
            </tr>
          </table>
        </Indicate> */}
      </main>
    </>
  )
}

export default Home
