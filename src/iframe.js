import Regular from './Regular'
import './styles/iframe.scss'

export default class IFrame extends Regular {
  constructor (element, options) {
    super(element, options)
    console.log('Iframe constructor')
  }
}
