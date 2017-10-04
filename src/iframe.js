import Regular from './regular'

export default class IFrame extends Regular {
  constructor (element, options) {
    super(element, options)
    console.log('Iframe constructor')
  }
}
