// Prepare index.html contents, adding #root and exmpl stylesheet.
export default () => {
  const exmplStylesheet = document.createElement('link')
  exmplStylesheet.rel = 'stylesheet'
  exmplStylesheet.href = 'https://unpkg.com/exmpl@1.0.2/dist/styles.css'
  document.head.appendChild(exmplStylesheet)

  const rootTag = document.querySelector('#root')

  if (rootTag) {
    return
  }

  const rootDiv = document.createElement('div')
  rootDiv.id = 'root'
  document.body.appendChild(rootDiv)
}