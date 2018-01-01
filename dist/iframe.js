let width
let height
let offsetLeft = 0
let offsetTop = 0
let initialized = false

const updateSize = () => {
  width = Math.max(
    document.documentElement['clientWidth'],
    document.body['scrollWidth'],
    document.documentElement['scrollWidth'],
    document.body['offsetWidth'],
    document.documentElement['offsetWidth']
  )

  height = Math.max(
    document.documentElement['clientHeight'],
    document.body['scrollHeight'],
    document.documentElement['scrollHeight'],
    document.body['offsetHeight'],
    document.documentElement['offsetHeight']
  )

  sendWindowState()
}

const updateOffset = () => {
  offsetLeft = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft)
  offsetTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop)

  sendWindowState()
}

const getWindowState = () => ({
  indicate: true,
  initialized,
  offsetLeft,
  offsetTop,
  width,
  height
})

const sendWindowState = () => {
  parent.postMessage(getWindowState(), '*')
}

const addListeners = () => {
  window.addEventListener('resize', updateSize)
  window.addEventListener('scroll', updateOffset)
  window.addEventListener('message', function(event) {
      var data = event.data,
          jumpWidth = data.jumpWidth,
          dir = data.dir,
          offset = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft
      if (dir === 'right') {
          window.scrollBy(jumpWidth, 0)
      } else {
          window.scrollBy(-jumpWidth, 0)
      }
  }, false)
}

function r(f){/in/.test(document.readyState)?setTimeout(r,9,f):f()}
r(function(){
    updateSize()
    addListeners()
    initialized = true

    // IE Hide scrollbars inside iframe
    document.documentElement.style['-ms-overflow-style'] = 'none'
})
